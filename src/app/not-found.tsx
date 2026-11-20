import Link from 'next/link';
export default function NotFound(){return <section className="container empty-page"><span className="eyeline">404 · PAGE NOT FOUND</span><h1>A little off course.</h1><p>This page isn’t in our curriculum. Find your next class below.</p><Link className="btn primary" href="/classes">Explore classes →</Link></section>;}
