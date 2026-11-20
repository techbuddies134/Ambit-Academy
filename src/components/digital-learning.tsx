import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, MonitorPlay } from 'lucide-react';

export function DigitalLearning() {
  return (
    <section className="digital-learning-section section-space" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container two-col">
        
        {/* Left Side: Image */}
        <div className="digital-image-wrapper">
          <Image 
            src="/academy/smart-board.jpg" // Yahan apni image ka path dein
            alt="Students learning with smart board"
            width={720}
            height={500}
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Right Side: Text Copy */}
        <div className="digital-copy">
          <span className="eyeline"><MonitorPlay size={16}/> DIGITAL CLASSROOM</span>
          <h2>Smart boards.<br/><span className="purple-text">Brighter futures.</span></h2>
          <p>We integrate state-of-the-art interactive smart boards into our daily lessons. This digital approach transforms traditional learning into an engaging, visual, and hands-on experience for every student.</p>
          
          <ul className="check-list">
            <li><Check/> <strong>Visual Learning:</strong> Complex concepts explained through 3D models and videos.</li>
            <li><Check/> <strong>Interactive Sessions:</strong> Students interact directly with the board, making learning fun.</li>
            <li><Check/> <strong>Modern Resources:</strong> Instant access to a vast library of digital educational content.</li>
          </ul>

          <Link href="/smart-learning" className="text-link">
            Discover our tech <ArrowUpRight size={16}/>
          </Link>
        </div>

      </div>
    </section>
  );
}