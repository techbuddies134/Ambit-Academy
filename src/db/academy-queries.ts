import { asc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { academyPrograms } from '@/db/schema';
export const getPrograms = () => db.select().from(academyPrograms).orderBy(asc(academyPrograms.position));
export async function getProgram(slug: string) {
  const [program] = await db.select().from(academyPrograms).where(eq(academyPrograms.slug, slug)).limit(1);
  return program ?? null;
}
