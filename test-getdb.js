// Test getDb() function
import * as db from './server/db.ts';

console.log('Testing getDb() and getPublishedBlogPosts()...\n');

try {
  console.log('Calling getPublishedBlogPosts()...');
  const posts = await db.getPublishedBlogPosts();
  console.log(`Result: ${posts.length} posts`);
  console.log(JSON.stringify(posts.map(p => ({ id: p.id, title: p.title, published: p.published })), null, 2));
  
  if (posts.length === 0) {
    console.log('\n⚠️  WARNING: getPublishedBlogPosts() returned empty array!');
    console.log('This matches the API behavior.');
  } else {
    console.log('\n✅ getPublishedBlogPosts() works correctly!');
  }
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error);
}

process.exit(0);
