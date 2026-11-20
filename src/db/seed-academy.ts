import { config } from 'dotenv';
config({ path: '.env.local' });
import { db, pool } from './index';
import { academyPrograms } from './schema';
import { programmes } from '../lib/academy';
async function main() {
  for (const program of programmes) {
    await db.insert(academyPrograms).values(program).onConflictDoUpdate({ target: academyPrograms.slug, set: program });
  }
  console.log('Three academy programmes and nine weekly sessions saved.');
}
main().catch((err) => { console.error(err); process.exitCode = 1; }).finally(() => pool.end());
