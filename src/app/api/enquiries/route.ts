import { randomBytes } from 'node:crypto';
import { and, gte, lte } from 'drizzle-orm';
import { db } from '@/db';
import { academyEnquiries, academyPrograms } from '@/db/schema';
import { contactTimes, enquiryTypes } from '@/lib/academy';

export async function POST(request: Request) {
  const fail = (error: string, status = 400) => Response.json({ error }, { status });
  let body;
  try { body = await request.json(); } catch { return fail('Please submit a valid enquiry.'); }
  if (!body || typeof body !== 'object') return fail('Please complete the enquiry form.');
  const text = (field: string) => typeof body[field] === 'string' ? body[field].trim() : '';
  const guardian = text('guardian'), email = text('email').toLowerCase(), phone = text('phone');
  const grade = Number(body.grade), interest = text('interest'), preference = text('preference'), message = text('message');
  if (guardian.length < 2 || guardian.length > 90) return fail('Please enter a parent or guardian name (2–90 characters).');
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('Please enter a valid email address.');
  if (!/^[+\d()\s-]{7,24}$/.test(phone) || phone.replace(/\D/g, '').length < 7) return fail('Please enter a valid contact number.');
  if (!Number.isInteger(grade) || grade < 1 || grade > 12) return fail('Choose a grade from 1 to 12.');
  if (!enquiryTypes.some(t => t === interest) || !contactTimes.some(t => t === preference)) return fail('Choose an enquiry type and a contact time.');
  if (body.consent !== true || message.length > 1000) return fail('Please check your message and contact permission.');
  try {
    const [program] = await db.select().from(academyPrograms).where(and(lte(academyPrograms.gradeFrom, grade), gte(academyPrograms.gradeTo, grade))).limit(1);
    if (!program) return fail('This programme is temporarily unavailable.', 409);
    const reference = `AMB-${randomBytes(5).toString('hex').toUpperCase()}`;
    await db.insert(academyEnquiries).values({ reference, guardian, email, phone, grade, programSlug: program.slug, interest, preference, message });
    return Response.json({ reference, program: program.title }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch { return fail('We could not save the enquiry. Please try again shortly.', 503); }
}
