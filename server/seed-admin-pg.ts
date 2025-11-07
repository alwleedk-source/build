import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { admins } from "../drizzle/schema";
import bcrypt from "bcrypt";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

async function seed() {
  const client = postgres(DATABASE_URL, { prepare: false });
  const db = drizzle(client);

  const email = "waleed.qodami@gmail.com";
  const password = "3505490qwE@@";
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    await db.insert(admins).values({
      email,
      passwordHash,
      name: "Waleed",
      role: "super_admin",
      isActive: 1,
    });

    console.log("✅ Admin created successfully!");
    console.log("Email:", email);
    console.log("Password:", password);
  } catch (error: any) {
    if (error.code === "23505") { // Unique constraint violation
      console.log("⚠️  Admin already exists");
    } else {
      console.error("Error:", error);
    }
  }

  await client.end();
}

seed();
