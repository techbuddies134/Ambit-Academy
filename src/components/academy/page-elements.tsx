import Link from 'next/link';
import {ChevronRight} from 'lucide-react';
export function Breadcrumb({items}:{items:string[]}){return <nav aria-label="Breadcrumb" className="breadcrumb"><Link href="/">Home</Link>{items.map((item,i)=><span key={item}><ChevronRight size={12}/>{item==='Our Classes'&&i<items.length-1?<Link href="/classes">{item}</Link>:<span aria-current={i===items.length-1?'page':undefined}>{item}</span>}</span>)}</nav>;}
