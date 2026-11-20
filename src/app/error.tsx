"use client";
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="container empty-page"><span className="eyeline">A SHORT PAUSE</span><h1>Let’s try that again.</h1><p>We couldn’t load this page. Your submitted enquiries are safe.</p><button className="btn primary" onClick={reset}>Reload this page</button></section>;}
