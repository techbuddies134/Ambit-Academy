import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { AcademyProgram } from '@/db/schema';
export function ProgrammeCard({program:p, detailed=false}:{program:AcademyProgram; detailed?:boolean}){
  return <Link href={`/classes/${p.slug}`} className={`program-card ${p.theme} ${detailed?'detailed':''}`}><div className="card-scene"><div className="card-grid"/><span className="grade-pill"><i/> GRADES {p.gradeFrom}–{p.gradeTo}</span><span className="decor-orbit"/><img src={p.image} alt={`${p.title} learning illustration`} width="260" height="260" loading="lazy"/><span className="stage-code">PATHWAY / 0{p.position}</span></div><div className="card-content"><div className="card-title-row"><h3>{p.title}</h3><span className="card-arrow"><ArrowUpRight size={18}/></span></div><p>{p.summary}</p>{detailed&&<div className="subject-chips">{p.subjects.map(s=><span key={s}>{s}</span>)}</div>}<div className="card-details"><span>{p.duration}-minute sessions</span><span>View class <ArrowRight size={14}/></span></div></div></Link>;
}
