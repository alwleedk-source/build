const bcrypt = require('bcrypt');

const password = '3505490qwE@@';
bcrypt.hash(password, 12, (err, hash) => {
  if (err) {
    console.error('Error:', err);
    process.exit(1);
  }
  console.log('\n=================================');
  console.log('Password Hash Generated:');
  console.log('=================================');
  console.log(hash);
  console.log('=================================\n');
  console.log('Use this hash in SQL INSERT statement');
  console.log('\nSQL Example:');
  console.log("INSERT INTO admins (email, password_hash, name, role, is_active, created_at, updated_at)");
  console.log("VALUES (");
  console.log("  'waleed.qodami@gmail.com',");
  console.log(`  '${hash}',`);
  console.log("  'Waleed Qodami',");
  console.log("  'super_admin',");
  console.log("  1,");
  console.log("  NOW(),");
  console.log("  NOW()");
  console.log(");");
  process.exit(0);
});
