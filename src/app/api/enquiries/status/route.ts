import { and, eq } from 'drizzle-orm';
import { db } from '@/db';
import { academyEnquiries, academyPrograms } from '@/db/schema';
export async function POST(request: Request) {
  let data;
  try { data = await request.json(); } catch { return Response.json({error:'Invalid request.'}, {status:400}); }
  const reference = typeof data?.reference === 'string' ? data.reference.trim().toUpperCase() : '';
  const email = typeof data?.email === 'string' ? data.email.trim().toLowerCase() : '';
  if (!/^AMB-[A-F0-9]{10}$/.test(reference) || !email || email.length > 254) return Response.json({error:'Enter your enquiry reference and the email you used.'}, {status:400});
  try {
    const [record] = await db.select({ reference: academyEnquiries.reference, status: academyEnquiries.status, title: academyPrograms.title, grade: academyEnquiries.grade, interest: academyEnquiries.interest, createdAt: academyEnquiries.createdAt }).from(academyEnquiries).innerJoin(academyPrograms, eq(academyPrograms.slug, academyEnquiries.programSlug)).where(and(eq(academyEnquiries.reference, reference), eq(academyEnquiries.email, email))).limit(1);
    if (!record) return Response.json({error:'No matching enquiry. Check the reference and email, then try again.'}, {status:404});
    return Response.json(record, {headers:{'Cache-Control':'no-store'}});
  } catch { return Response.json({error:'Tracking is temporarily unavailable. Please try again.'}, {status:503}); }
}
