import Link from 'next/link';

export function BrandMark({ size = 43 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M3 34.5 20.7 6.2a3.8 3.8 0 0 1 6.5 0l18 28.3-8.5 1.9L23.9 16 11.4 36.4Z" fill="currentColor"/><path d="m2.5 37.1 8.2 1.2 12.8-4.6v8.6L10 46 2.5 42.3z" fill="currentColor" opacity=".85"/><path d="m45.5 37.1-8.2 1.2-12.8-4.6v8.6L38 46l7.5-3.7z" fill="currentColor"/><path d="m18.9 29.5 5-8 5.1 8-5 1.8z" fill="currentColor" opacity=".57"/></svg>;
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link 
      className={`brand ${light ? 'brand-light' : ''}`} 
      href="/" 
      aria-label="Ambit Academy home" 
      style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
    >
      {/* Logo Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="/academy/Logo%20Ambit.png" 
        alt="Ambit Logo" 
        style={{ width: '80px', height: '80px', objectFit: 'contain' }} 
      />
      
      {/* Text Section (Logo ke right side par) */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Ambit ka Text */}
        <span style={{ 
          fontSize: '28px', 
          fontWeight: '800', 
          color: light ? '#ffffff' : '#0A1E5C', // <--- Yahan Dark Blue color lagaya hai
          lineHeight: '1',
          letterSpacing: '-0.5px'
        }}>
          Ambit
        </span>
        
        {/* Academy ka Text */}
        <span style={{ 
          fontSize: '12px', 
          fontWeight: '600', 
          color: light ? '#cbd5e1' : '#D32F2F', // <--- Yahan Red color lagaya hai (ya #64748B for Grey)
          letterSpacing: '4px', 
          marginTop: '4px',
          textTransform: 'uppercase'
        }}>
          Academy
        </span>
      </div>
    </Link>
  );
}