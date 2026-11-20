"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, Phone, Menu, X } from 'lucide-react';
import { academy, programmes } from '@/lib/academy';
import { Brand } from './brand';
import { EnquireButton, useExperience } from './experience';

export function Header() {
  const pathname = usePathname();
  const { openEnquiry } = useExperience();
  const [menu, setMenu] = useState(false);
  const [classes, setClasses] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const close = () => {
    setMenu(false);
    setClasses(false);
  };

  useEffect(() => {
    const click = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setClasses(false);
        setMenu(false);
      }
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        setClasses(false);
      }
    };
    document.addEventListener('pointerdown', click);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('pointerdown', click);
      document.removeEventListener('keydown', key);
    };
  }, []);

  const links = [
    ['Home', '/'],
    ['Smart Learning', '/smart-learning'],
    ['About Us', '/about'],
    ['Contact', '/contact']
  ];

  function navLink(label: string, href: string) {
    return (
      <Link
        key={href}
        className={`nav-link ${pathname === href ? 'current' : ''}`}
        aria-current={pathname === href ? 'page' : undefined}
        href={href}
        onClick={close}
      >
        {label}
      </Link>
    );
  }

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement">
        <div className="container utility-row">
          <button onClick={() => openEnquiry()}>
            <i className="open-dot" />
            Admissions open for {academy.session} <ArrowUpRight size={12} />
          </button>
          <div className="utility-contact">
            {/* Yahan Email hata kar Phone/WhatsApp number laga diya hai */}
            <a href={academy.phoneHref} target="_blank" rel="noopener noreferrer">
              <Phone size={12} />
              {academy.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="navigation" ref={navRef}>
        <div className="container nav-inner">
          
          {/* Logo */}
          <Brand />

          {/* Desktop Navigation */}
          <nav className="desktop-links" aria-label="Main navigation">
            {navLink('Home', '/')}
            
            <div className="classes-menu">
              <button
                className={`nav-link ${pathname.startsWith('/classes') ? 'current' : ''}`}
                aria-expanded={classes}
                aria-controls="program-menu"
                onClick={() => setClasses(!classes)}
              >
                Our Classes <ChevronDown size={13} className={classes ? 'turn' : ''} />
              </button>
              
              {classes && (
                <div id="program-menu" className="nav-popover">
                  <span className="eyeline">LEARNING PATHWAYS</span>
                  {programmes.map(p => (
                    <Link key={p.slug} onClick={close} href={`/classes/${p.slug}`}>
                      <i className={`tiny-dot ${p.theme}`} />
                      <span>
                        {p.title}
                        <small>Grades {p.gradeFrom}–{p.gradeTo}</small>
                      </span>
                      <ArrowUpRight size={15} />
                    </Link>
                  ))}
                  <Link className="all-programmes" href="/classes" onClick={close}>
                    View all classes <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </div>
            
            {links.slice(1).map(([label, href]) => navLink(label, href))}
          </nav>

          {/* Right Side Actions */}
          <div className="nav-actions">
            <EnquireButton className="btn primary nav-cta" />
            <button
              aria-expanded={menu}
              aria-controls="mobile-navigation"
              aria-label={menu ? 'Close navigation' : 'Open navigation'}
              className="nav-mobile icon-btn"
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {menu && (
          <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
            {[['Home', '/'], ['Our Classes', '/classes'], ...links.slice(1)].map(([label, href]) =>
              navLink(label, href)
            )}
          </nav>
        )}
      </header>
    </>
  );
}