import type {Metadata} from 'next';
import {Clock,Mail,MapPin,Phone} from 'lucide-react';
import {Breadcrumb} from '@/components/academy/page-elements';
import {EnquiryForm} from '@/components/academy/enquiry-form';
import {TrackButton} from '@/components/academy/experience';
import {academy} from '@/lib/academy';
export const metadata:Metadata={title:'Contact & Admissions',description:'Ask about admissions, request a trial class, or arrange a visit to Ambit Academy in Karachi.'};
export default function Contact(){return <section className="contact-page"><div className="container"><Breadcrumb items={['Contact']}/><div className="contact-layout"><div><span className="eyeline">CONTACT & ADMISSIONS</span><h1>Let’s talk<br/><span className="purple-text">possibilities.</span></h1><p className="intro-text">A question about classes, a visit to the campus, or a first step into learning. We’re here for it.</p><div className="contact-methods">{[{i:Mail,l:'Write to us',v:academy.email,h:`mailto:${academy.email}`},{i:Phone,l:'Call admissions',v:academy.phone,h:academy.phoneHref},{i:MapPin,l:'Our campus',v:academy.location,h:''},{i:Clock,l:'Admissions hours',v:academy.hours+' (PKT)',h:''}].map(item=><div key={item.l}><span><item.i size={18}/></span><div><small>{item.l}</small>{item.h?<a href={item.h}>{item.v}</a>:<p>{item.v}</p>}</div></div>)}</div><div className="track-note"><p>Already sent your details?</p><TrackButton className="text-link"/></div></div><div className="contact-form-panel"><EnquiryForm/></div></div></div></section>;}
