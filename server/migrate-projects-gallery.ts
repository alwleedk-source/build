import postgres from 'postgres';

export async function migrateProjectsGallery(req: any, res: any) {
  try {
    const sql = postgres(process.env.DATABASE_URL!);
    
    console.log('[Migrate Projects] Starting...');
    
    // Add slug column
    await sql`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE
    `;
    console.log('[Migrate Projects] ✅ Added slug column');
    
    // Add images column (JSON array)
    await sql`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS images TEXT
    `;
    console.log('[Migrate Projects] ✅ Added images column');
    
    // Add content columns
    await sql`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS content TEXT,
      ADD COLUMN IF NOT EXISTS "contentEn" TEXT
    `;
    console.log('[Migrate Projects] ✅ Added content columns');
    
    // Generate slugs for existing projects
    const projects = await sql`SELECT id, title FROM projects WHERE slug IS NULL`;
    
    for (const project of projects) {
      const slug = project.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      await sql`UPDATE projects SET slug = ${slug} WHERE id = ${project.id}`;
      console.log(`[Migrate Projects] Generated slug for project ${project.id}: ${slug}`);
    }
    
    // Make slug NOT NULL after generating values
    await sql`
      ALTER TABLE projects 
      ALTER COLUMN slug SET NOT NULL
    `;
    console.log('[Migrate Projects] ✅ Set slug as NOT NULL');
    
    await sql.end();
    
    console.log('[Migrate Projects] Complete!');
    
    res.json({
      success: true,
      message: 'Projects gallery migration completed',
      projectsUpdated: projects.length
    });
  } catch (error: any) {
    console.error('[Migrate Projects] Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
