import Link from 'next/link';
import { ArrowRight, MapPin, Phone, Navigation } from 'lucide-react';
import { academy, programmes } from '@/lib/academy';
import { Brand } from './brand';
import { EnquireButton, TrackButton } from './experience';

// Admissions Banner
export function AdmissionsBanner() {
  return (
    <section className="admission-banner">
      <div className="container banner-row">
        <div>
          <span className="eyeline pale"><i /> YOUR NEXT CHAPTER</span>
          <h2>Big futures start small.</h2>
          <p>Find the right classroom for your child. Let’s talk.</p>
        </div>
        <EnquireButton className="btn white">
          Talk to admissions <ArrowRight size={17} />
        </EnquireButton>
      </div>
      <div className="banner-orbit" aria-hidden="true" />
    </section>
  );
}

// Footer with Google Maps
export function Footer() {
  return (
    <>
      {/* ========================================================= */}
      {/* GOOGLE MAPS SECTION                                       */}
      {/* ========================================================= */}
      <section className="w-full bg-[#ffffff] py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <span className="eyeline justify-center"><MapPin size={16} className="inline mr-2"/> VISIT OUR CAMPUS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0f24] mt-2 mb-4">Find Us Here</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              6 No Chungi College Rd, Moh Barkat Town, Daska, 51010, Pakistan
            </p>
          </div>
          
          <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <iframe
              src="https://maps.google.com/maps?q=89P9%2B49%20Daska,%20Pakistan&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, marginTop: '-60px' }} 
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ambit Academy Location"
            ></iframe>

            <a 
              href="https://www.google.com/maps/search/?api=1&query=89P9%2B49%20Daska,%20Pakistan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 bg-white text-[#0a0f24] px-5 py-3 rounded-full shadow-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors"
            >
              <Navigation size={16} /> Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER SECTION (Off-White Background)                     */}
      {/* ========================================================= */}
      <footer className="site-footer" style={{ backgroundColor: '#f8f9fa', color: '#0a0f24', paddingTop: '60px', paddingBottom: '20px' }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            
            {/* About Section */}
            <div className="footer-about">
              <Brand /> {/* Logo Default (Dark) version mein hai */}
              <p style={{ color: '#475569', marginTop: '16px', lineHeight: '1.6' }}>
                Small classes, smart classrooms, and a world of possibilities for every learner.
              </p>
              <span className="foot-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '16px', color: '#475569', fontSize: '13px' }}>
                <i className="open-dot" style={{ backgroundColor: '#22c55e', width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }} /> 
                Admissions open · {academy.session}
              </span>
            </div>

            {/* Explore Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0a0f24', marginBottom: '8px' }}>Explore</h3>
              <Link href="/classes" className="hover:text-[#D32F2F] transition-colors" style={{ color: '#475569', fontSize: '14px' }}>Our classes</Link>
              <Link href="/smart-learning" className="hover:text-[#D32F2F] transition-colors" style={{ color: '#475569', fontSize: '14px' }}>Smart learning</Link>
              <Link href="/about" className="hover:text-[#D32F2F] transition-colors" style={{ color: '#475569', fontSize: '14px' }}>About Ambit</Link>
              <TrackButton />
            </div>

            {/* Programmes Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0a0f24', marginBottom: '8px' }}>Programmes</h3>
              {programmes.map(p => (
                <Link key={p.slug} href={`/classes/${p.slug}`} className="hover:text-[#D32F2F] transition-colors" style={{ color: '#475569', fontSize: '14px' }}>
                  {p.title}
                </Link>
              ))}
              <EnquireButton className="footer-link hover:text-[#D32F2F] transition-colors" interest="Trial class">
                Request a trial class
              </EnquireButton>
            </div>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0a0f24', marginBottom: '8px' }}>Get in touch</h3>
              <a href={academy.phoneHref} className="hover:text-[#D32F2F] transition-colors" style={{ color: '#475569', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} /> {academy.phone}
              </a>
              <span style={{ color: '#475569', fontSize: '14px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} style={{ marginTop: '2px', flexShrink: 0 }} /> 
                {academy.location}
              </span>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '15px', 
            paddingTop: '24px', 
            marginTop: '40px',
            borderTop: '1px solid #e2e8f0' // Light border
          }}>
            <span style={{ color: '#64748b', fontSize: '13px' }}>
              © {new Date().getFullYear()} Ambit Academy. All rights reserved.
            </span>
            
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              Developed by{' '}
              <a 
                href="https://portfolio-self-nine-93.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#D32F2F] transition-colors"
                style={{ color: '#0a0f24', fontWeight: 'bold', textDecoration: 'underline' }}
              >
                Tech Buddies
              </a>
            </span>

            <Link href="/privacy" className="hover:text-[#D32F2F] transition-colors" style={{ color: '#64748b', fontSize: '13px' }}>
              Privacy notice
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}