/**
 * Fix Admin Password Script
 * This script will:
 * 1. Check the current admin user
 * 2. Verify the password hash
 * 3. Update the password if needed
 * 
 * Run with: npx tsx server/fix-admin-password.ts
 * Or on Railway: railway run pnpm fix-password
 */

import { getAdminByEmail, hashPassword, verifyPassword, updateAdminPassword } from './auth';

async function fixAdminPassword() {
  console.log('🔧 Starting password fix script...\n');

  const adminEmail = 'waleed.qodami@gmail.com';
  const correctPassword = '3505490qwE@@';

  try {
    // Step 1: Get admin user
    console.log('📋 Step 1: Fetching admin user...');
    const admin = await getAdminByEmail(adminEmail);

    if (!admin) {
      console.error('❌ Admin user not found!');
      console.log('\n💡 Run this first: pnpm db:setup');
      process.exit(1);
    }

    console.log('✅ Admin user found:');
    console.log(`   ID: ${admin.id}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name: ${admin.name}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Active: ${admin.isActive === 1 ? 'Yes' : 'No'}`);
    console.log(`   Password Hash: ${admin.passwordHash.substring(0, 20)}...`);

    // Step 2: Verify current password
    console.log('\n📋 Step 2: Verifying current password...');
    const isValid = await verifyPassword(correctPassword, admin.passwordHash);

    if (isValid) {
      console.log('✅ Password is CORRECT! Hash matches.');
      console.log('\n🎉 No fix needed. Login should work!');
      console.log('\n📝 Try logging in with:');
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${correctPassword}`);
      return;
    }

    console.log('❌ Password is INCORRECT! Hash does NOT match.');
    console.log('   This explains why login fails.');

    // Step 3: Generate new hash
    console.log('\n📋 Step 3: Generating new password hash...');
    const newHash = await hashPassword(correctPassword);
    console.log(`   New hash: ${newHash.substring(0, 20)}...`);

    // Step 4: Verify new hash
    console.log('\n📋 Step 4: Verifying new hash...');
    const newHashValid = await verifyPassword(correctPassword, newHash);
    if (!newHashValid) {
      console.error('❌ New hash verification failed! Something is wrong with bcrypt.');
      process.exit(1);
    }
    console.log('✅ New hash verified successfully!');

    // Step 5: Update password
    console.log('\n📋 Step 5: Updating password in database...');
    await updateAdminPassword(admin.id, correctPassword);
    console.log('✅ Password updated successfully!');

    // Step 6: Verify update
    console.log('\n📋 Step 6: Verifying update...');
    const updatedAdmin = await getAdminByEmail(adminEmail);
    if (!updatedAdmin) {
      console.error('❌ Failed to fetch updated admin');
      process.exit(1);
    }

    const finalCheck = await verifyPassword(correctPassword, updatedAdmin.passwordHash);
    if (!finalCheck) {
      console.error('❌ Final verification failed!');
      process.exit(1);
    }

    console.log('✅ Final verification successful!');
    console.log('\n🎉 Password fix completed!');
    console.log('\n📝 Login credentials:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${correctPassword}`);
    console.log('\n✅ You can now login successfully!');

  } catch (error) {
    console.error('\n❌ Password fix failed:', error);
    throw error;
  }
}

// Run the fix
fixAdminPassword()
  .then(() => {
    console.log('\n✅ Script finished successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
