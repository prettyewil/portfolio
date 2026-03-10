import { useEffect, useRef } from 'react';
import { ArrowUpRight, Mail, MapPin, Github, Linkedin, Calendar } from 'lucide-react';
import AvatarBackground from './components/AvatarBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- STYLES FOR MARQUEE ANIMATION ---
const styles = `
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    display: flex;
    white-space: nowrap;
    animation: marquee 20s linear infinite;
    width: max-content;
  }
  .animate-marquee:hover {
    animation-play-state: paused;
  }
`;

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);

  // Inject custom styles for the marquee
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => { document.head.removeChild(styleSheet); };
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!appRef.current) return;

    const ctx = gsap.context(() => {
      // Hero Timeline
      const tl = gsap.timeline();

      tl.fromTo(".hero-text",
        { y: 100, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.15, ease: "power4.out", delay: 0.2 }
      )
        .fromTo(".hero-subtext",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
          "-=0.5" // overlap with previous animation
        );

      // Scroll Reveals for all elements marked with .gsap-reveal
      gsap.utils.toArray<Element>('.gsap-reveal').forEach((elem) => {
        gsap.fromTo(elem,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, appRef);

    return () => ctx.revert(); // Clean up GSAP context on unmount
  }, []);

  return (
    <div ref={appRef} className="relative min-h-screen bg-[#0a0a0a] text-[#f4f4f4] font-sans selection:bg-white selection:text-black">
      <AvatarBackground />
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full border-b border-zinc-800 bg-[#0a0a0a]/90 backdrop-blur-md z-50 flex justify-between items-center px-6 md:px-12 py-4">
        <div className="font-mono text-xs uppercase tracking-[0.2em] font-bold">
          Cydiemar <br /> Lagrosas
        </div>
        <div className="flex gap-8 text-sm uppercase tracking-widest font-mono">
          <a href="#projects" className="hidden md:block hover:text-zinc-400 transition-colors">Work</a>
          <a href="#about" className="hidden md:block hover:text-zinc-400 transition-colors">About</a>
          <a href="#experience" className="hidden md:block hover:text-zinc-400 transition-colors">Experience</a>
          <a href="#contact" className="hover:text-zinc-400 transition-colors flex items-center gap-2">
            Contact <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </a>
        </div>
      </nav>

      <main className="relative z-10 pt-24 md:pt-32">
        {/* HERO SECTION */}
        <section className="px-6 md:px-12 py-12 md:py-24 border-b border-zinc-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 overflow-hidden">
              <h1 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-[140px] leading-[0.85] font-black uppercase tracking-tighter">
                <div className="hero-text opacity-0">Designing</div>
                <div className="hero-text opacity-0">Scalable</div>
                <div className="text-zinc-600 hero-text opacity-0">Solutions.</div>
              </h1>
            </div>

            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 md:mt-16 pt-8 border-t border-zinc-800">
              <div className="hero-subtext opacity-0">
                <p className="text-xl md:text-2xl text-zinc-400 text-justify max-w-lg font-light leading-relaxed">
                  Bridging the gap between user-centric UI/UX and robust full-stack architecture.
                </p>
              </div>
              <div className="flex flex-col md:items-end justify-end space-y-4 font-mono text-sm text-zinc-500 uppercase tracking-widest hero-subtext opacity-0">
                <div className="space-y-2">
                  <p className="flex items-center gap-2"><MapPin size={16} /> Bukidnon, Philippines</p>
                  <p>IT Student & Freelancer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK MARQUEE */}
        <section className="border-b border-zinc-800 overflow-hidden bg-zinc-900/30 py-4 flex items-center gsap-reveal opacity-0">
          <div className="animate-marquee font-mono text-sm md:text-base uppercase tracking-widest text-zinc-400 flex items-center">
            {/* Duplicated for smooth infinite scroll */}
            <div className="flex items-center space-x-12 px-6">
              <span>Figma</span> <span className="text-zinc-700">•</span>
              <span>Laravel</span> <span className="text-zinc-700">•</span>
              <span>Vue.js</span> <span className="text-zinc-700">•</span>
              <span>React.js</span> <span className="text-zinc-700">•</span>
              <span>Node.js</span> <span className="text-zinc-700">•</span>
              <span>Flutter</span> <span className="text-zinc-700">•</span>
              <span>Python</span> <span className="text-zinc-700">•</span>
              <span>PostgreSQL</span> <span className="text-zinc-700">•</span>
              <span>Tailwind CSS</span> <span className="text-zinc-700">•</span>
            </div>
            <div className="flex items-center space-x-12 px-6">
              <span>Figma</span> <span className="text-zinc-700">•</span>
              <span>Laravel</span> <span className="text-zinc-700">•</span>
              <span>Vue.js</span> <span className="text-zinc-700">•</span>
              <span>React.js</span> <span className="text-zinc-700">•</span>
              <span>Node.js</span> <span className="text-zinc-700">•</span>
              <span>Flutter</span> <span className="text-zinc-700">•</span>
              <span>Python</span> <span className="text-zinc-700">•</span>
              <span>PostgreSQL</span> <span className="text-zinc-700">•</span>
              <span>Tailwind CSS</span> <span className="text-zinc-700">•</span>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="border-b border-zinc-800">
          <div className="px-6 md:px-12 py-8 border-b border-zinc-800 gsap-reveal opacity-0">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">Selected Projects</h2>
          </div>

          <div className="flex flex-col">
            {/* PROJECT 1 */}
            <div className="group grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-800 hover:bg-zinc-900 transition-colors duration-300 gsap-reveal opacity-0">
              <div className="lg:col-span-4 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4 block">01 / Full-Stack</span>
                  <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Farm Operations System</h3>
                </div>
                <div className="flex gap-2 flex-wrap mt-8">
                  <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs font-mono">Laravel</span>
                  <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs font-mono">Vue.js</span>
                  <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs font-mono">PostgreSQL</span>
                </div>
              </div>
              <div className="lg:col-span-8 p-6 md:p-12 flex flex-col justify-center">
                <p className="text-lg md:text-xl text-zinc-400 text-justify font-light mb-8 max-w-2xl">
                  A comprehensive end-to-end digital solution combining farm operations management with weather analytics and an online marketplace. Integrated real-time weather data via OpenWeather API to enable climate-informed decision-making.
                </p>
                {/* Project Image */}
                <a href="https://anibukid.up.railway.app/" target="_blank" rel="noreferrer" className="w-full h-48 md:h-64 bg-zinc-950 border border-zinc-800 rounded-lg relative overflow-hidden flex items-center justify-center group-hover:border-zinc-600 transition-colors cursor-pointer group/link">
                  <img src="/farm-ops.png" alt="Farm Operations System" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                </a>
              </div>
            </div>

            {/* PROJECT 2 */}
            <div className="group grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-800 hover:bg-zinc-900 transition-colors duration-300 gsap-reveal opacity-0">
              <div className="lg:col-span-4 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4 block">02 / Full-Stack</span>
                  <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-4">DormSync</h3>
                </div>
                <div className="flex gap-2 flex-wrap mt-8">
                  <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs font-mono">React.js</span>
                  <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs font-mono">Node.js</span>
                  <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs font-mono">PostgreSQL</span>
                </div>
              </div>
              <div className="lg:col-span-8 p-6 md:p-12 flex flex-col justify-center">
                <p className="text-lg md:text-xl text-zinc-400 text-justify font-light mb-8 max-w-2xl">
                  Engineered a web-based system to streamline dormitory operations, including tenant management, room assignment, and secure billing logic.
                </p>
                <a href="https://dormsync-xi.vercel.app/" target="_blank" rel="noreferrer" className="w-full h-48 md:h-64 bg-zinc-950 border border-zinc-800 rounded-lg relative overflow-hidden flex items-center justify-center group-hover:border-zinc-600 transition-colors cursor-pointer">
                  <img src="/dormsync.png" alt="DormSync" className="w-full h-full object-cover top-0 left-0 opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                </a>
              </div>
            </div>

            {/* PROJECT 3 & 4 (Grid style) */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-zinc-800 hover:bg-zinc-900 transition-colors flex flex-col h-full gsap-reveal opacity-0">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">03 / UI/UX Design</span>
                <h3 className="text-2xl font-bold mb-4">SAKAY Ride-Hailing</h3>
                <p className="text-zinc-400 text-justify font-light mb-8 flex-grow">
                  Lead designer for a ride-hailing application tailored for campus transportation. Focused heavily on user-centered interfaces to ensure maximum usability and accessibility for both student passengers and drivers.
                </p>
                <a href="#" className="flex items-center gap-2 text-sm font-mono hover:text-white text-zinc-500 mt-auto w-max group">
                  View Case Study <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
              <div className="p-6 md:p-12 hover:bg-zinc-900 transition-colors flex flex-col h-full gsap-reveal opacity-0">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">04 / Frontend & UI</span>
                <h3 className="text-2xl font-bold mb-4">Bibwak POS System</h3>
                <p className="text-zinc-400 text-justify font-light mb-8 flex-grow">
                  Designed and developed the frontend for a specialized point of sale and inventory system. Optimized checkout workflows for high-volume sales periods.
                </p>
                <a href="#" className="flex items-center gap-2 text-sm font-mono hover:text-white text-zinc-500 mt-auto w-max group">
                  View Case Study <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="border-b border-zinc-800">
          <div className="p-6 md:p-12 lg:w-2/3 gsap-reveal opacity-0">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-8">About Me</h2>
            <p className="text-lg md:text-xl text-zinc-400 text-justify font-light leading-relaxed mb-6">
              A remarkably competent IT student presently advancing expertise in creating scalable digital solutions.
            </p>
            <p className="text-lg md:text-xl text-zinc-400 text-justify font-light leading-relaxed">
              Dedicated to acquiring hands-on industry experience in <strong className="text-white font-medium">Cloud Infrastructure</strong> and scalable web development while continually refining <strong className="text-white font-medium">user-centric design</strong> skills.
            </p>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="border-b border-zinc-800">
          <div className="p-6 md:p-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-12 gsap-reveal opacity-0">Experience / Hackathons</h2>
            <div className="flex flex-col gap-8 lg:w-2/3">
              {/* Item */}
              <div className="group grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-zinc-800 pb-8 hover:pl-4 transition-all duration-300 gsap-reveal opacity-0 items-center">
                <div>
                  <h4 className="text-xl md:text-2xl font-bold mb-1">Technopreneurship "SAKAY"</h4>
                  <p className="text-zinc-400">UI/UX Designer (Hipster)</p>
                </div>
                <div className="flex flex-col md:items-end space-y-2 font-mono text-sm text-zinc-500 uppercase tracking-widest">
                  <p className="flex items-center gap-2"><Calendar size={14} /> Mar 2025</p>
                  <p className="flex items-center gap-2"><MapPin size={14} /> Maramag, Bukidnon</p>
                </div>
              </div>
              {/* Item */}
              <div className="group grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-zinc-800 pb-8 hover:pl-4 transition-all duration-300 gsap-reveal opacity-0 items-center">
                <div>
                  <h4 className="text-xl md:text-2xl font-bold mb-1">Digi Agri Hackathon</h4>
                  <p className="text-zinc-400">UI/UX Designer (Hipster)</p>
                </div>
                <div className="flex flex-col md:items-end space-y-2 font-mono text-sm text-zinc-500 uppercase tracking-widest">
                  <p className="flex items-center gap-2"><Calendar size={14} /> Apr 2025</p>
                  <p className="flex items-center gap-2"><MapPin size={14} /> Cagayan de Oro</p>
                </div>
              </div>
              {/* Item */}
              <div className="group grid grid-cols-1 md:grid-cols-2 gap-4 hover:pl-4 transition-all duration-300 gsap-reveal opacity-0 items-center">
                <div>
                  <h4 className="text-xl md:text-2xl font-bold mb-1">Inter-Campus Tech Comp.</h4>
                  <p className="text-zinc-400">Web Designer / 2nd Place</p>
                </div>
                <div className="flex flex-col md:items-end space-y-2 font-mono text-sm text-zinc-500 uppercase tracking-widest">
                  <p className="flex items-center gap-2"><Calendar size={14} /> Dec 2024</p>
                  <p className="flex items-center gap-2"><MapPin size={14} /> Maramag, Bukidnon</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT / FOOTER */}
        <footer id="contact" className="p-6 md:p-12 pb-24 md:pb-32 relative overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 100%, #333 0%, transparent 50%)' }}></div>

          <h2 className="text-[10vw] md:text-[120px] font-black uppercase tracking-tighter leading-none mb-8 z-10 hover:text-zinc-300 transition-colors cursor-pointer gsap-reveal opacity-0">
            Let's Talk.
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 z-10 font-mono text-sm uppercase tracking-widest mt-8 gsap-reveal opacity-0">
            <a href="mailto:lagrosascydiemar@gmail.com" className="flex items-center gap-2 hover:text-white text-zinc-400 transition-colors group">
              <Mail size={18} /> lagrosascydiemar@gmail.com
              <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
            <a href="tel:+639354477276" className="flex items-center gap-2 hover:text-white text-zinc-400 transition-colors">
              +63 935 447 7276
            </a>
            <div className="flex gap-6 mt-4 md:mt-0 md:ml-8 border-t md:border-t-0 md:border-l border-zinc-800 pt-4 md:pt-0 md:pl-8">
              <a href="https://linkedin.com/in/cydiemar-lagrosas-0111033b5" target="_blank" rel="noreferrer" className="hover:text-white text-zinc-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/prettyewil" target="_blank" rel="noreferrer" className="hover:text-white text-zinc-400 transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="mt-24 z-10 flex w-full justify-center items-center border-t border-zinc-800 pt-8 font-mono text-xs text-zinc-600 uppercase gsap-reveal opacity-0">
            <p>© 2026 Cydiemar. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
