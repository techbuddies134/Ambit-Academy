"use client";

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, CheckCheck, Copy, GraduationCap, LoaderCircle, ShieldCheck } from 'lucide-react';
import { contactTimes, enquiryTypes } from '@/lib/academy';

type Receipt = {reference: string; program: string};

export function EnquiryForm({ initialGrade, initialInterest = 'Admissions', onDone }: { initialGrade?: number; initialInterest?: string; onDone?: () => void }) {
  const [interest, setInterest] = useState(initialInterest);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [copied, setCopied] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); 
    if (busy) return;
    
    const fields = new FormData(event.currentTarget);
    setError(''); 
    setBusy(true);

    const guardian = fields.get('guardian');
    const grade = fields.get('grade');
    const phone = fields.get('phone');
    const preference = fields.get('preference');
    const message = fields.get('message') || "No message provided";
    const consent = fields.get('consent') === 'on';

    if (!consent) {
      setError("Please check the consent box to proceed.");
      setBusy(false);
      return;
    }

    try {
      const myNumber = "923013178389"; 
      
      const waText = `*New Enquiry - Ambit Academy*\n\n*Interest:* ${interest}\n*Parent Name:* ${guardian}\n*Student Grade:* ${grade}\n*Contact:* ${phone}\n*Preferred Time:* ${preference}\n*Message:* ${message}`;
      
      const waUrl = `https://wa.me/${myNumber}?text=${encodeURIComponent(waText)}`;
      
      window.open(waUrl, '_blank');

      setReceipt({
        reference: "WA-" + Math.floor(100000 + Math.random() * 900000), 
        program: `${interest} for ${grade}`
      });
    } catch (err) { 
      setError(err instanceof Error ? err.message : 'Could not connect. Please try again.'); 
    } finally { 
      setBusy(false); 
    }
  }

  if (receipt) return (
    <div className="receipt" role="status">
      <div className="success-icon"><CheckCheck size={33}/></div>
      <span className="eyeline">ENQUIRY READY</span>
      <h2>Redirecting to WhatsApp.</h2>
      <p>If WhatsApp did not open automatically, please click the button below to send your enquiry for {receipt.program}.</p>
      <button className="btn primary" onClick={onDone || (()=>setReceipt(null))}>{onDone ? 'Back to the academy' : 'Make another enquiry'} <ArrowRight size={16}/></button>
    </div>
  );

  return (
    <form className="enquiry-form" onSubmit={submit}>
      <div className="form-heading">
        <span className="eyeline"><GraduationCap size={15}/> ADMISSIONS 2026–27</span>
        <h2>Let’s meet your learner.</h2>
        <p>Tell us a little about your family. We’ll help you find the right class.</p>
      </div>
      
      <fieldset className="intent-group">
        <legend>I’m interested in</legend>
        <div>
          {enquiryTypes.map(t=><button type="button" key={t} className={interest === t ? 'selected' : ''} aria-pressed={interest === t} onClick={()=>setInterest(t)}>{t}</button>)}
        </div>
      </fieldset>

      <div className="field-grid">
        <label>Parent / guardian name<input required minLength={2} maxLength={90} name="guardian" autoComplete="name" placeholder="Your full name"/></label>
        
        <label>Student’s grade
          <select name="grade" defaultValue={initialGrade || ''} required>
            <option value="" disabled>Select a class/grade</option>
            <option value="Playgroup">Playgroup</option>
            <option value="Nursery">Nursery</option>
            <option value="KG">KG (Prep)</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9 (Matric)</option>
            <option value="10">Class 10 (Matric)</option>
            <option value="11">Class 11 (Intermediate)</option>
            <option value="12">Class 12 (Intermediate)</option>
          </select>
        </label>
        
        <label className="full-field">Contact number<input required type="tel" minLength={7} maxLength={24} name="phone" autoComplete="tel" placeholder="+92 301 3178389"/></label>
        
        <label className="full-field">Preferred contact time <span>(Pakistan time)</span><select name="preference" defaultValue={contactTimes[0]}>{contactTimes.map(p=><option key={p}>{p}</option>)}</select></label>
      </div>

      <details className="optional-message">
        <summary>Add a message <span>(optional)</span></summary>
        <textarea name="message" maxLength={1000} rows={2} aria-label="Optional message" placeholder="Anything we should know about your learning goals?"/>
      </details>

      <label className="check-field">
        <input type="checkbox" name="consent" required/> I agree to be contacted via WhatsApp about this enquiry.
      </label>

      {error && <p role="alert" className="form-error">{error}</p>}
      
      <button className="btn primary submit-wide" type="submit" disabled={busy}>
        {busy ? <><LoaderCircle className="spin" size={17}/> Preparing...</> : <>Send via WhatsApp <ArrowRight size={17}/></>}
      </button>
      
      <p className="safe-note"><ShieldCheck size={13}/> Only parent or guardian contact details are requested.</p>
    </form>
  );
}

type StatusRecord = {reference:string; status:string; title:string; grade:number; interest:string; createdAt:string};

export function EnquiryTracker() {
  const [record,setRecord]=useState<StatusRecord|null>(null), [busy,setBusy]=useState(false),[error,setError]=useState('');
  
  async function lookup(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setError('');setRecord(null);
    try{
      const res=await fetch('/api/enquiries/status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(e.currentTarget)))});
      const data=await res.json();
      if(!res.ok) throw new Error(data.error);
      setRecord(data);
    }catch(err){
      setError(err instanceof Error?err.message:'Unable to find the enquiry.');
    }finally{
      setBusy(false);
    }
  }

  return (
    <div className="enquiry-form">
      <div className="form-heading">
        <span className="eyeline">PARENT DESK</span>
        <h2>Track an enquiry.</h2>
        <p>Use the reference from your confirmation and the same email address.</p>
      </div>
      <form className="track-form" onSubmit={lookup}>
        <label>Enquiry reference<input name="reference" required placeholder="AMB-XXXXXXXXXX" maxLength={14} autoCapitalize="characters"/></label>
        <label>Email address<input name="email" required type="email" autoComplete="email" placeholder="you@example.com"/></label>
        <button className="btn primary" disabled={busy}>{busy ? 'Checking…' : 'Check status'} <ArrowRight size={16}/></button>
      </form>
      {error && <p className="form-error" role="alert">{error}</p>}
      {record && (
        <div className="tracking-result" role="status">
          <span className="status-tag"><i/>{record.status}</span>
          <h3>{record.title} · Grade {record.grade}</h3>
          <p>{record.interest} enquiry received on {new Date(record.createdAt).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}.</p>
          <small>{record.reference}</small>
        </div>
      )}
    </div>
  );
}