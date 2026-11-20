"use client";
import {useState} from 'react';
import {Plus,Minus} from 'lucide-react';
import {faqs} from '@/lib/academy';
export function Faq(){const[active,setActive]=useState<number|null>(0);return <div className="faq-list">{faqs.map(([q,a],i)=><div key={q} className={`faq-item ${i===active?'is-open':''}`}><h3><button aria-expanded={active===i} aria-controls={`answer-${i}`} onClick={()=>setActive(i===active?null:i)}>{q}{active===i?<Minus size={17}/>:<Plus size={17}/>}</button></h3><div id={`answer-${i}`} className="faq-answer" aria-hidden={active!==i}><div><p>{a}</p></div></div></div>)}</div>;}
