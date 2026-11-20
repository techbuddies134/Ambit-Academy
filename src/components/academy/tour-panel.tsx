"use client";
import {useRef,useState,useEffect} from 'react';
import {ArrowLeft,ArrowRight,Box,BookOpen,Hand,Minus,Monitor,Pause,Play,Plus,RotateCcw} from 'lucide-react';
import {makeClassroom,type RoomView} from '@/lib/classroom-scene';
import {EnquireButton} from './experience';
const views: {id:RoomView;label:string;title:string;copy:string;icon:typeof Box}[]=[
  {id:'overview',label:'Room overview',title:'A room made for discovery.',copy:'A clear view of the board, seats for collaboration, and space for everyone to join in.',icon:Box},
  {id:'board',label:'Smart board',title:'Big ideas, made visible.',copy:'Our interactive board brings geometry, diagrams, and live problem-solving into every lesson.',icon:Monitor},
  {id:'library',label:'Reading corner',title:'A quiet place to explore.',copy:'A classroom library encourages independent reading, new questions, and discoveries between lessons.',icon:BookOpen},
];
export default function TourPanel(){
  const host=useRef<HTMLDivElement>(null),scene=useRef<ReturnType<typeof makeClassroom>|null>(null);
  const[active,setActive]=useState<RoomView>('overview'),[rotating,setRotating]=useState(false),[fallback,setFallback]=useState(false);
  useEffect(()=>{if(!host.current)return;try{scene.current=makeClassroom(host.current);}catch{setFallback(true);}return()=>{scene.current?.dispose();scene.current=null;};},[]);
  const which=views.find(v=>v.id===active)!;
  function choose(v:RoomView){setActive(v);setRotating(false);scene.current?.auto(false);scene.current?.preset(v);}
  return <div className="tour-panel"><div className="tour-header"><span className="eyeline"><Box size={14}/> CAMPUS EXPLORER</span><h2>Inside the smart classroom.</h2></div><div className="tour-canvas-wrap"><div ref={host} className="tour-canvas"/>{fallback&&<div className={`tour-fallback view-${active}`}><img src="/academy/classroom.jpg" alt="Detailed classroom preview"/></div>}<span className="tour-live"><i className="open-dot"/>{fallback?'GUIDED PREVIEW':'INTERACTIVE 3D'}</span>{!fallback&&<div className="rotate-help"><Hand size={13}/> Drag to rotate · Scroll to zoom</div>}{!fallback&&<div className="tour-tools"><button onClick={()=>scene.current?.rotate(.18)} aria-label="Rotate classroom left"><ArrowLeft size={16}/></button><button onClick={()=>scene.current?.rotate(-.18)} aria-label="Rotate classroom right"><ArrowRight size={16}/></button><button onClick={()=>scene.current?.zoom(1)} aria-label="Zoom in"><Plus size={16}/></button><button onClick={()=>scene.current?.zoom(-1)} aria-label="Zoom out"><Minus size={16}/></button><button onClick={()=>{scene.current?.auto(!rotating);setRotating(!rotating);}} aria-label={rotating?'Pause rotation':'Auto-rotate classroom'} aria-pressed={rotating}>{rotating?<Pause size={14}/>:<Play size={14}/>}</button><button onClick={()=>choose('overview')} aria-label="Reset classroom view"><RotateCcw size={15}/></button></div>}</div><div className="tour-lower"><div className="view-tabs">{views.map(v=><button onClick={()=>choose(v.id)} key={v.id} aria-pressed={active===v.id} className={active===v.id?'selected':''}><v.icon size={14}/>{v.label}</button>)}</div><div className="tour-detail"><div key={active}><h3>{which.title}</h3><p>{which.copy}</p></div><EnquireButton interest="Campus visit" className="btn primary small-btn">Visit in person <ArrowRight size={15}/></EnquireButton></div></div></div>;
}
