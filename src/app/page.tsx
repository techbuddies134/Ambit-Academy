import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, BookOpen, Check, Layers3, MonitorPlay, PauseCircle } from 'lucide-react';
import { getPrograms } from '@/db/academy-queries';
import { Hero } from '@/components/academy/hero';
import { Stats } from '@/components/academy/stats';
import { ProgrammeCard } from '@/components/academy/programme-card';
import { SmartBoard } from '@/components/academy/smart-board';
import { Faq } from '@/components/academy/faq';
import { AdmissionsBanner } from '@/components/academy/footer';

export const dynamic = 'force-dynamic';

// --- CLASSROOM RING KA DATA ---
// Yahan aapki nayi pictures ke naam update kar diye gaye hain
const classData = [
  { id: 1, grade: "GRADES 3-9", title: "Kids Robotics, Coding & AI", desc: "Build real sensor robots, code interactive games & learn safe AI on...", image: "/academy/robotics.jpg", badgeColor: "bg-green-500 text-white" },
  { id: 2, grade: "GRADES 2-4", title: "Spoken English, Public Speaking", desc: "Stage confidence, fluent communication & lightning-fast...", image: "/academy/english.jpg", badgeColor: "bg-orange-500 text-white" },
  { id: 3, grade: "GRADES 5-8", title: "3D Math & Science Lab", desc: "Visualize complex geometry and physics through interactive 3D...", image: "/academy/math.jpg", badgeColor: "bg-blue-500 text-white" },
  { id: 4, grade: "GRADES 6-9", title: "O-Level Board Mastery", desc: "Complete past paper walkthroughs, exam techniques & time...", image: "/academy/olevel.jpg", badgeColor: "bg-purple-500 text-white" },
  { id: 5, grade: "GRADES 1-2", title: "Grade 1 Phonics & Reading", desc: "Building strong reading foundations with interactive games.", image: "/academy/phonics.jpg", badgeColor: "bg-pink-500 text-white" },
  { id: 6, grade: "GRADES 3-5", title: "Creative Writing & Arts", desc: "Sparking imagination through storytelling and art projects.", image: "/academy/arts.jpg", badgeColor: "bg-teal-500 text-white" }
];

export default async function Home() {
  const programs = await getPrograms();

  return (
    <>
      <Hero />
      <Stats />
      
      {/* Program Section */}
      <section className="program-section section-space" id="programmes">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyeline"><Layers3 size={15} /> OUR PROGRAMMES</span>
              <h2>A class for every stage<span className="purple-text">.</span></h2>
            </div>
            <Link className="text-link" href="/classes">View all classes <ArrowRight size={16} /></Link>
          </div>
          <div className="program-grid">
            {programs.map(p => <ProgrammeCard program={p} key={p.slug} />)}
          </div>
        </div>
      </section>

      {/* Smart Classroom Section */}
      <section className="smart-section section-space">
        <div className="container two-col">
          <div className="smart-copy">
            <span className="eyeline"><MonitorPlay size={16} /> THE SMART CLASSROOM</span>
            <h2>See it. Try it.<br /><span className="purple-text">Understand it.</span></h2>
            <p>From moving a triangle to exploring a planet, our smart boards put discovery in your child’s hands. Try a mini lesson, right here.</p>
            <ul className="check-list">
              <li><Check />Visual explanations that make ideas click</li>
              <li><Check />Hands-on activities in every lesson</li>
              <li><Check />Real-time feedback from an educator</li>
            </ul>
            <Link href="/smart-learning" className="text-link">Discover smart learning <ArrowUpRight size={16} /></Link>
          </div>
          <SmartBoard />
        </div>
      </section>

      {/* Approach Section (Known by name) */}
      <section className="approach-section section-space">
        <div className="container two-col">
          <div className="approach-photo">
            <img 
  src="/academy/math.jpg" 
  alt="A teacher giving an individual student support during a small classroom activity" 
  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
/>
            <span><UsersIcon /> A little more personal</span>
          </div>
          <div className="approach-copy">
            <span className="eyeline">THE AMBIT APPROACH</span>
            <h2>Known by name.<br />Taught with care.</h2>
            <p>Great technology works best with a great teacher. Our small learning groups give every child room to ask, experiment, and find their voice.</p>
            <div className="approach-facts">
              <div><strong>12 : 1</strong><span>Maximum group ratio</span></div>
              <div><strong>3</strong><span>Purpose-built pathways</span></div>
            </div>
            <Link className="text-link" href="/about">Meet our academy <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* DIGITAL LEARNING Section */}
      <section className="smart-section section-space" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container two-col">
          <div className="smart-copy">
            <span className="eyeline"><MonitorPlay size={16} /> DIGITAL LEARNING</span>
            <h2>Smart boards.<br /><span className="purple-text">Brighter futures.</span></h2>
            <p>We integrate state-of-the-art interactive smart boards into our daily lessons. This digital approach transforms traditional learning into an engaging, visual, and hands-on experience for every student.</p>
            <ul className="check-list">
              <li><Check /><strong>Visual Learning:</strong> Complex concepts explained through 3D models and videos.</li>
              <li><Check /><strong>Interactive Sessions:</strong> Students interact directly with the board, making learning fun.</li>
              <li><Check /><strong>Modern Resources:</strong> Instant access to a vast library of digital educational content.</li>
            </ul>
            <Link href="/contact" className="text-link">Discover our tech <ArrowUpRight size={16} /></Link>
          </div>
          
          <div className="smart-image" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Image 
              src="/academy/smart-board.jpg" 
              alt="Students learning with digital smart board"
              width={600}
              height={450}
              style={{ borderRadius: '24px', objectFit: 'cover', width: '100%', height: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3D CLASSROOM RING SECTION (Without Price & Demo Button)   */}
      {/* ========================================================= */}
      <section className="relative w-full py-24 bg-[#0a0f24] overflow-hidden text-white font-sans border-t border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-4 max-w-7xl">
          <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">360° Interactive Class Ring</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-4 tracking-tight">Spin Through Our <span className="text-yellow-500">3D Smart Classrooms</span></h2>
          <p className="text-gray-400 max-w-xl mb-12">Hover over the 3D ring to pause and inspect any grade track—from Grade 1 Phonics & 3D Math up to O-Level Board Mastery and Kids Robotics.</p>
        </div>

        <div className="relative h-[500px] w-full flex items-center justify-center perspective-container group">
          <div className="relative w-[260px] h-[380px] preserve-3d animate-ring-spin group-hover:[animation-play-state:paused]">
            {classData.map((item, index) => {
              const angle = index * 60; 
              return (
                <div key={item.id} className="absolute inset-0 rounded-2xl bg-[#0f172a] border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 hover:border-cyan-400/50" style={{ transform: `rotateY(${angle}deg) translateZ(350px)`, backfaceVisibility: 'hidden' }}>
                  
                  {/* Image Section */}
                  <div className="relative h-[45%] w-full">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent" />
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-md ${item.badgeColor}`}>{item.grade}</span>
                  </div>
                  
                  {/* Text Section (Price & Demo Removed) */}
                  <div className="p-5 flex flex-col justify-center items-center text-center h-[55%]">
                    <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{item.desc}</p>
                  </div>

                </div>
              );
            })}
          </div>
          
          {/* Center 3D Badge */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="bg-[#0f172a] border border-cyan-500/30 rounded-full p-4 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              <PauseCircle className="text-cyan-400 mb-1" size={24} />
              <span className="text-[10px] font-bold tracking-widest text-white">AMBIT 3D</span>
              <span className="text-[8px] text-gray-400">6 TRACKS</span>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8 flex items-center justify-center gap-2">
          <span className="animate-pulse">✨</span> Hover on any floating classroom card to pause rotation
        </div>
      </section>
      {/* ========================================================= */}

      {/* FAQ Section */}
      <section className="faq-section section-space">
        <div className="container faq-layout">
          <div>
            <span className="eyeline">PARENT CORNER</span>
            <h2>A few good<br />questions.</h2>
            <p>Choosing an academy is a big step.<br />We’re here to make it easier.</p>
            <Link className="text-link" href="/contact">Contact our team <ArrowUpRight size={16} /></Link>
          </div>
          <Faq />
        </div>
      </section>

      <AdmissionsBanner />
    </>
  );
}

function UsersIcon() {
  return <BookOpen size={16} />;
}