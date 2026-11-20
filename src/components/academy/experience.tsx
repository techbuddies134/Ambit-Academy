"use client";

import { createContext, useContext, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { ArrowUpRight, LoaderCircle, X } from 'lucide-react';
import { EnquiryForm, EnquiryTracker } from './enquiry-form';

const TourPanel = dynamic(()=>import('./tour-panel'), {ssr:false, loading:()=><div className="tour-loading"><LoaderCircle className="spin"/> Opening your classroom…</div>});
type View = {type: 'enquiry'; grade?: number; interest?: string} | {type: 'tour' | 'track'};
type Experience = {openEnquiry:(grade?:number, interest?:string)=>void; openTour:()=>void; openTrack:()=>void};
const ExperienceContext = createContext<Experience | null>(null);
export function useExperience(){const ctx=useContext(ExperienceContext);if(!ctx)throw new Error('Missing academy experience provider');return ctx;}
function Modal({children,onClose,kind}:{children:ReactNode;onClose:()=>void;kind:string}){
  const ref=useRef<HTMLDialogElement>(null);
  useEffect(()=>{const el=ref.current;const previous=document.activeElement as HTMLElement | null;const before=document.body.style.overflow;el?.showModal();document.body.style.overflow='hidden';return()=>{el?.close();document.body.style.overflow=before;previous?.focus({preventScroll:true});};},[]);
  return <dialog className={`modal ${kind === 'tour' ? 'modal-tour' : ''}`} ref={ref} aria-label={kind==='tour'?'Interactive 3D classroom tour':kind==='track'?'Track an admission enquiry':'Admission enquiry form'} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===ref.current){const r=ref.current.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose();}}}><button className="modal-close icon-btn" aria-label="Close dialog" onClick={onClose}><X size={19}/></button>{children}</dialog>;
}
export function ExperienceProvider({children}:{children:ReactNode}){
  const [view,setView]=useState<View|null>(null);
  const close=useCallback(()=>setView(null),[]);
  return <ExperienceContext.Provider value={{openEnquiry:(grade,interest)=>setView({type:'enquiry',grade,interest}),openTour:()=>setView({type:'tour'}),openTrack:()=>setView({type:'track'})}}>{children}{view&&<Modal key={view.type} kind={view.type} onClose={close}>{view.type==='enquiry'?<EnquiryForm initialGrade={view.grade} initialInterest={view.interest} onDone={close}/>:view.type==='tour'?<TourPanel/>:<EnquiryTracker/>}</Modal>}</ExperienceContext.Provider>;
}
export function EnquireButton({children,className='btn primary',grade,interest='Admissions'}:{children?:ReactNode;className?:string;grade?:number;interest?:string}){const {openEnquiry}=useExperience();return <button type="button" className={className} onClick={()=>openEnquiry(grade,interest)}>{children || <>Enquire Now <ArrowUpRight size={17}/></>}</button>;}
export function TrackButton({className='footer-link'}:{className?:string}){const{openTrack}=useExperience();return <button className={className} type="button" onClick={openTrack}>Track an enquiry</button>;}
