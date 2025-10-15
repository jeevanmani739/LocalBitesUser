import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://0ec90b57d6e95fcbda19832f.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseServiceKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY is required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration(filePath: string) {
  console.log(`Running migration: ${path.basename(filePath)}`);

  const sql = fs.readFileSync(filePath, 'utf8');

  const { error } = await supabase.rpc('exec_sql', { sql_string: sql });

  if (error) {
    console.error(`Error in ${path.basename(filePath)}:`, error);
    throw error;
  }

  console.log(`✓ ${path.basename(filePath)} completed`);
}

async function setupDatabase() {
  console.log('Setting up database...\n');

  const migrationsDir = path.join(__dirname, '../supabase/migrations');
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

  for (const file of migrationFiles) {
    await runMigration(path.join(migrationsDir, file));
  }

  console.log('\n✓ Database setup complete!');
}

setupDatabase().catch(console.error);
