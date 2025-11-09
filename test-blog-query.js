// Test blog query directly
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq, desc } from 'drizzle-orm';
import { blogPosts } from './drizzle/schema.ts';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const client = postgres(DATABASE_URL);
const db = drizzle(client);

console.log('Testing blog query...\n');

try {
  // Test 1: Get all blog posts
  console.log('Test 1: Get ALL blog posts');
  const allPosts = await db.select().from(blogPosts);
  console.log(`Found ${allPosts.length} total posts`);
  console.log(JSON.stringify(allPosts.map(p => ({ id: p.id, title: p.title, published: p.published })), null, 2));

  // Test 2: Get published posts with eq()
  console.log('\nTest 2: Get published posts with eq(blogPosts.published, 1)');
  const publishedPosts = await db.select().from(blogPosts).where(eq(blogPosts.published, 1));
  console.log(`Found ${publishedPosts.length} published posts`);
  console.log(JSON.stringify(publishedPosts.map(p => ({ id: p.id, title: p.title, published: p.published })), null, 2));

  // Test 3: Check schema definition
  console.log('\nTest 3: Check blogPosts schema');
  console.log('blogPosts.published column:', blogPosts.published);

} catch (error) {
  console.error('Error:', error.message);
  console.error(error);
} finally {
  await client.end();
}
