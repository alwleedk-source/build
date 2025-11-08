const bcrypt = require('bcrypt');

async function generateHash() {
  const password = '3505490qwE@@';
  const hash = await bcrypt.hash(password, 12);
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\n--- SQL Statement ---');
  console.log(`INSERT INTO "admins" ("email", "passwordHash", "name", "role", "isActive", "createdAt", "updatedAt")`);
  console.log(`VALUES (`);
  console.log(`  'waleed.qodami@gmail.com',`);
  console.log(`  '${hash}',`);
  console.log(`  'Waleed Qodami',`);
  console.log(`  'super_admin',`);
  console.log(`  1,`);
  console.log(`  NOW(),`);
  console.log(`  NOW()`);
  console.log(`)`);
  console.log(`ON CONFLICT ("email") DO UPDATE SET`);
  console.log(`  "passwordHash" = EXCLUDED."passwordHash",`);
  console.log(`  "updatedAt" = NOW();`);
}

generateHash().catch(console.error);
