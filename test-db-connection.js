import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_CNGH3idvFBJ0@ep-flat-surf-abtxd6ks-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require";

console.log('Testing database connection...');
console.log('DATABASE_URL:', DATABASE_URL.replace(/:[^:@]+@/, ':****@'));

try {
  const sql = postgres(DATABASE_URL, { 
    prepare: false,
    ssl: 'require',
    connection: {
      application_name: 'buildcraft-test'
    }
  });
  
  console.log('Client created successfully');
  
  const result = await sql`SELECT email, name, role FROM admins WHERE email = 'waleed.qodami@gmail.com'`;
  
  console.log('Query result:', result);
  
  await sql.end();
  console.log('Connection closed');
  
} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}
