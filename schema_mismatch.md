# Schema Mismatch Issue

## Problem
The production database schema is DIFFERENT from the local schema!

## Production Database Columns (blogPosts):
```
id, title, slug, excerpt, content, image, category, authorId, published, order, createdAt, updatedAt
```

## Missing Columns (Expected but not in production):
- titleEn
- excerptEn
- contentEn
- categoryEn

## This Means:
The bilingual migration (`add_english_fields.sql` or `add-bilingual-columns.sql`) was **NEVER run on production**!

## Solution:
1. Check if migration files exist
2. Run the bilingual migration on production
3. Then insert content with English fields

OR

Insert content WITHOUT English fields (Dutch only for now).
