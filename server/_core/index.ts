import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // Traditional form-based login with server-side redirect
  app.post("/api/auth/login-redirect", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).send('<html><body><script>alert("Email and password are required"); window.location.href="/login";</script></body></html>');
      }

      const { authenticateAdmin } = await import('../auth');
      const admin = await authenticateAdmin(email, password);
      
      if (!admin) {
        return res.status(401).send('<html><body><script>alert("بيانات تسجيل الدخول غير صحيحة"); window.location.href="/login";</script></body></html>');
      }

      // Create session token
      const { sdk } = await import('./sdk');
      const sessionToken = await sdk.createSessionToken(`admin_${admin.id}`, {
        name: admin.name,
        expiresInMs: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      // Set cookie
      const { getSessionCookieOptions, COOKIE_NAME } = await import('./cookies');
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { 
        ...cookieOptions, 
        maxAge: 30 * 24 * 60 * 60 * 1000 
      });

      // Server-side redirect
      res.redirect(302, '/admin');
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).send('<html><body><script>alert("حدث خطأ أثناء تسجيل الدخول"); window.location.href="/login";</script></body></html>');
    }
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
