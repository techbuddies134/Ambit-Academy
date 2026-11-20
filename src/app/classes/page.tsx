import type { Metadata } from 'next';
import {Layers3} from 'lucide-react';
import {getPrograms} from '@/db/academy-queries';
import {ClassBrowser} from '@/components/academy/class-browser';
import {AdmissionsBanner} from '@/components/academy/footer';
import {Breadcrumb} from '@/components/academy/page-elements';
export const dynamic='force-dynamic';
export const metadata: Metadata={title:'Our Classes',description:'Explore Primary Years, Middle School, and Senior School learning programmes for Grades 1–12. Compare subjects, class schedules, and learning goals.'};
export default async function ClassesPage(){const programs=await getPrograms();return <><section className="page-intro"><div className="container"><Breadcrumb items={['Our Classes']}/><span className="eyeline"><Layers3 size={15}/> OUR PROGRAMMES</span><h1>Find their <span className="purple-text">next chapter.</span></h1><p>Three thoughtful pathways, from first discoveries to confident exam preparation.<br className="desktop-only"/> Find the right learning group for your child.</p></div></section><section className="container browser-section"><ClassBrowser programs={programs}/></section><AdmissionsBanner/></>;}
