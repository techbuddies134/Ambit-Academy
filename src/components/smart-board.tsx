import Image from "next/image";
import Link from "next/link";

export default function SmartBoard() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Yahan apni smart board ki image ka naam dein. Image 'public' folder mein honi chahiye */}
              <Image
                src="/smart-board.jpg" 
                alt="Students learning with smart board"
                width={800}
                height={600}
                className="object-cover w-full h-auto"
              />
            </div>
            
            {/* Floating Badge (Optional - Image ke upar ek chota tag) */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg flex items-center gap-2 border border-gray-100">
              <span className="text-2xl">✨</span>
              <span className="font-bold text-gray-800 text-sm">Interactive Learning</span>
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full lg:w-1/2">
            <span className="text-purple-700 font-bold tracking-wider text-sm uppercase mb-3 block">
              Digital Classroom
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Smart Boards for <br />
              <span className="text-purple-700">Modern Learning.</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Hum apni classes mein state-of-the-art smart boards use karte hain jo students ke liye learning ko asaan aur mazedaar banate hain. Visuals aur interactive content ke zariye complex topics ko samajhna ab bohot aasan ho gaya hai.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1 text-xl">✓</span>
                <div>
                  <strong className="text-gray-900">Visual Learning:</strong> 
                  <span className="text-gray-600"> 3D models aur videos ke zariye concepts ko dekhein aur samjhein.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1 text-xl">✓</span>
                <div>
                  <strong className="text-gray-900">Interactive Sessions:</strong> 
                  <span className="text-gray-600"> Students directly board par interact karke actively participate karte hain.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1 text-xl">✓</span>
                <div>
                  <strong className="text-gray-900">Digital Resources:</strong> 
                  <span className="text-gray-600"> Digital content ki ek badi library tak foran rasai (instant access).</span>
                </div>
              </li>
            </ul>

            <Link 
              href="/contact" 
              className="inline-flex items-center text-purple-700 font-semibold hover:text-purple-900 transition-colors group"
            >
              Discover Our Technology 
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}