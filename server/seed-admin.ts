/**
 * Seed initial admin user
 * Run with: npx tsx server/seed-admin.ts
 */

import { createAdmin, getAdminByEmail } from "./auth";

async function seedAdmin() {
  const email = "waleed.qodami@gmail.com";
  const password = "3505490qwE@@";
  const name = "Waleed Qodami";

  console.log("🌱 Seeding initial admin...");

  try {
    // Check if admin already exists
    const existing = await getAdminByEmail(email);
    
    if (existing) {
      console.log(`✅ Admin already exists: ${email}`);
      console.log(`   ID: ${existing.id}`);
      console.log(`   Name: ${existing.name}`);
      console.log(`   Role: ${existing.role}`);
      return;
    }

    // Create new admin
    const admin = await createAdmin({
      email,
      password,
      name,
      role: "super_admin",
    });

    console.log(`✅ Admin created successfully!`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name: ${admin.name}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   ID: ${admin.id}`);
    console.log(`\n🔐 Login credentials:`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin()
  .then(() => {
    console.log("\n✅ Seed completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  });
