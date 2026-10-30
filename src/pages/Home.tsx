import { useEffect, useRef, useState } from 'react';
import {
    ArrowUpRight,
    Mail,
    MapPin,
    Github,
    Linkedin,
    Calendar,
    Award,
    FileText,
    X,
    ChevronLeft,
    ChevronRight,
    GraduationCap,
    Briefcase,
    Layers,
    Cpu,
    Sparkles,
    ShieldCheck,
} from 'lucide-react';
import AvatarBackground from '../components/AvatarBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

// Certificate image imports
import certBICTC from '../assets/cert/Lagrosas, Cydiemar_BICTC Cert.jpg';
import certCollegeHonors from '../assets/cert/Lagrosas, Cydiemar_College Honors.jpg';
import certDICT from '../assets/cert/Lagrosas, Cydiemar_DICT.jpg';
import certDigiAgri from '../assets/cert/Lagrosas, Cydiemar_Digi Agri Hackathon.jpg';
import certDOLE from '../assets/cert/Lagrosas, Cydiemar_DOLE Cert.jpg';
import certTechnopreneurship from '../assets/cert/Lagrosas, Cydiemar_Technopreneurship.jpg';

// Certificate PDF imports
import pdfITCustomerSupport from '../assets/cert/Lagrosas, Cydiemar_ITCustomerSupportBasics.pdf';
import pdfTechXhibit from '../assets/cert/Lagrosas, Cydiemar_TechXhibit.pdf';
import pdfLagrosas from '../assets/cert/LAGROSAS, CYDIEMAR O..pdf';

gsap.registerPlugin(ScrollTrigger);

interface Certificate {
    title: string;
    type: 'image' | 'pdf';
    src: string;
    category: string;
}

const certificates: Certificate[] = [
    { title: 'BICT Certificate', type: 'image', src: certBICTC, category: 'Academic' },
    { title: 'College Honors', type: 'image', src: certCollegeHonors, category: 'Academic' },
    { title: 'DICT Certificate', type: 'image', src: certDICT, category: 'Training & Internship' },
    { title: 'Digi Agri Hackathon', type: 'image', src: certDigiAgri, category: 'Hackathon' },
    { title: 'DOLE Certificate', type: 'image', src: certDOLE, category: 'Training' },
    { title: 'Technopreneurship', type: 'image', src: certTechnopreneurship, category: 'Hackathon' },
    { title: 'IT Customer Support Basics', type: 'pdf', src: pdfITCustomerSupport, category: 'Training' },
    { title: 'TechXhibit', type: 'pdf', src: pdfTechXhibit, category: 'Competition' },
    { title: 'Academic Credentials', type: 'pdf', src: pdfLagrosas, category: 'Academic' },
];

const coreCompetences = [
    {
        title: 'Full-Stack Web Development',
        icon: Layers,
        desc: 'Proficient in designing, building, and deploying scalable web applications utilizing both MERN (MongoDB, Express, React, Node.js) and TALL (Tailwind, Alpine.js, Laravel, Livewire) stacks.',
        tags: ['MERN Stack', 'TALL Stack', 'REST APIs', 'PostgreSQL'],
    },
    {
        title: 'UI/UX & Product Design',
        icon: Cpu,
        desc: 'Dedicated to user-centered design principles, creating intuitive, accessible interfaces, and modern aesthetic schemes (such as glassmorphism) to enhance user engagement.',
        tags: ['Figma', 'User Research', 'Design Systems', 'Accessibility'],
    },
    {
        title: 'AI-Assisted Development',
        icon: Sparkles,
        desc: 'Highly adept at integrating generative AI tools into the daily development workflow to accelerate coding, streamline debugging, and produce thorough technical documentation.',
        tags: ['Prompt Engineering', 'AI Tooling', 'Rapid Prototyping', 'Code Review'],
    },
    {
        title: 'System Architecture & Automation',
        icon: ShieldCheck,
        desc: 'Skilled in designing secure role-based access controls, database management (PostgreSQL, MySQL), and workflow automation using built-in system features and scripts.',
        tags: ['RBAC', 'Database Design', 'Apps Script', 'Workflow Automation'],
    },
    {
        title: 'Administrative Operations',
        icon: Briefcase,
        desc: 'Adept at managing day-to-day office functions, streamlining operational workflows, and ensuring organizational efficiency to seamlessly support technical initiatives.',
        tags: ['Google Workspace', 'Operational Tracking', 'Technical Reporting'],
    },
    {
        title: 'Languages & Core Tooling',
        icon: GraduationCap,
        desc: 'Hands-on versatility across multiple programming paradigms and databases to build tailored solutions for enterprise and consumer platforms.',
        tags: ['PHP', 'Python', 'JavaScript', 'Dart', 'Java', 'SQL', 'VB.NET'],
    },
];

const styles = `
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    display: flex;
    white-space: nowrap;
    animation: marquee 26s linear infinite;
    width: max-content;
  }
  .animate-marquee:hover {
    animation-play-state: paused;
  }
`;

export default function Home() {
    const homeRef = useRef<HTMLDivElement>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const imageCerts = certificates.filter((c) => c.type === 'image');

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => setLightboxOpen(false);

    const nextImage = () => setLightboxIndex((prev) => (prev + 1) % imageCerts.length);
    const prevImage = () => setLightboxIndex((prev) => (prev - 1 + imageCerts.length) % imageCerts.length);

    useEffect(() => {
        if (!lightboxOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [lightboxOpen]);

    useEffect(() => {
        const styleSheet = document.createElement('style');
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    useEffect(() => {
        if (!homeRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(
                '.hero-text',
                { y: 100, opacity: 0, skewY: 5 },
                { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
            ).fromTo(
                '.hero-subtext',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' },
                '-=0.5'
            );

            gsap.utils.toArray<Element>('.gsap-reveal').forEach((elem) => {
                gsap.fromTo(
                    elem,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: elem,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, homeRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={homeRef}>
            <AvatarBackground />

            {/* NAVIGATION */}
            <nav className="fixed top-0 w-full border-b border-zinc-800 bg-[#0a0a0a]/90 backdrop-blur-md z-50 flex justify-between items-center px-6 md:px-12 py-4">
                <div className="font-mono text-xs uppercase tracking-[0.2em] font-bold">
                    Cydiemar <br /> Lagrosas
                </div>
                <div className="flex gap-8 text-sm uppercase tracking-widest font-mono">
                    <a href="#projects" className="hidden md:block hover:text-zinc-400 transition-colors">
                        Work
                    </a>
                    <a href="#about" className="hidden md:block hover:text-zinc-400 transition-colors">
                        About
                    </a>
                    <a href="#experience" className="hidden md:block hover:text-zinc-400 transition-colors">
                        Experience
                    </a>
                    <a href="#certificates" className="hidden md:block hover:text-zinc-400 transition-colors">
                        Certificates
                    </a>
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
                                    <p className="flex items-center gap-2">
                                        <MapPin size={16} /> Bukidnon, Philippines
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <GraduationCap size={16} /> Central Mindanao University
                                    </p>
                                    <p className="flex items-center gap-2 text-zinc-400">
                                        <Calendar size={14} /> BSIT Graduate — July 10, 2026
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TECH STACK MARQUEE */}
                <section className="border-b border-zinc-800 overflow-hidden bg-zinc-900/30 py-4 flex items-center gsap-reveal opacity-0">
                    <div className="animate-marquee font-mono text-sm md:text-base uppercase tracking-widest text-zinc-400 flex items-center">
                        <div className="flex items-center space-x-12 px-6">
                            <span>Figma</span> <span className="text-zinc-700">•</span>
                            <span>Laravel</span> <span className="text-zinc-700">•</span>
                            <span>Vue.js</span> <span className="text-zinc-700">•</span>
                            <span>React.js</span> <span className="text-zinc-700">•</span>
                            <span>Node.js</span> <span className="text-zinc-700">•</span>
                            <span>Python</span> <span className="text-zinc-700">•</span>
                            <span>PHP</span> <span className="text-zinc-700">•</span>
                            <span>Dart</span> <span className="text-zinc-700">•</span>
                            <span>Flutter</span> <span className="text-zinc-700">•</span>
                            <span>PostgreSQL</span> <span className="text-zinc-700">•</span>
                            <span>MySQL</span> <span className="text-zinc-700">•</span>
                            <span>Firebase</span> <span className="text-zinc-700">•</span>
                            <span>Google Apps Script</span> <span className="text-zinc-700">•</span>
                            <span>Tailwind CSS</span> <span className="text-zinc-700">•</span>
                        </div>
                        <div className="flex items-center space-x-12 px-6">
                            <span>Figma</span> <span className="text-zinc-700">•</span>
                            <span>Laravel</span> <span className="text-zinc-700">•</span>
                            <span>Vue.js</span> <span className="text-zinc-700">•</span>
                            <span>React.js</span> <span className="text-zinc-700">•</span>
                            <span>Node.js</span> <span className="text-zinc-700">•</span>
                            <span>Python</span> <span className="text-zinc-700">•</span>
                            <span>PHP</span> <span className="text-zinc-700">•</span>
                            <span>Dart</span> <span className="text-zinc-700">•</span>
                            <span>Flutter</span> <span className="text-zinc-700">•</span>
                            <span>PostgreSQL</span> <span className="text-zinc-700">•</span>
                            <span>MySQL</span> <span className="text-zinc-700">•</span>
                            <span>Firebase</span> <span className="text-zinc-700">•</span>
                            <span>Google Apps Script</span> <span className="text-zinc-700">•</span>
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
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
                                            01 / Full-Stack
                                        </span>
                                        <span className="font-mono text-xs text-zinc-500">Aug – Dec 2025</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                                        Farm Operations System
                                    </h3>
                                </div>
                                <div className="flex gap-2 flex-wrap mt-8">
                                    <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs font-mono">
                                        Laravel
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs font-mono">
                                        Vue.js
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs font-mono">
                                        PostgreSQL
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs font-mono">
                                        OpenWeather API
                                    </span>
                                </div>
                            </div>
                            <div className="lg:col-span-8 p-6 md:p-12 flex flex-col justify-center">
                                <p className="text-lg md:text-xl text-zinc-400 text-justify font-light mb-8 max-w-2xl">
                                    A comprehensive end-to-end digital solution combining farm operations management with
                                    weather analytics and an online marketplace. Implemented planting calendars, labor
                                    measurement, and harvest tracking to facilitate direct farm-to-consumer sales and
                                    data-driven farming.
                                </p>
                                <a
                                    href="https://anibukid.up.railway.app/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full h-48 md:h-64 bg-zinc-950 border border-zinc-800 rounded-lg relative overflow-hidden flex items-center justify-center group-hover:border-zinc-600 transition-colors cursor-pointer group/link"
                                >
                                    <img
                                        src="/farm-ops.png"
                                        alt="Farm Operations System"
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    />
                                </a>
                            </div>
                        </div>

                        {/* PROJECT 2 */}
                        <div className="group grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-800 hover:bg-zinc-900 transition-colors duration-300 gsap-reveal opacity-0">
                            <div className="lg:col-span-4 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
                                            02 / Full-Stack
                                        </span>
                                        <span className="font-mono text-xs text-zinc-500">Nov – Dec 2025</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-4">DormSync</h3>
                                </div>
                                <div className="flex gap-2 flex-wrap mt-8">
                                    <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs font-mono">
                                        React.js
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs font-mono">
                                        Node.js
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-700 rounded-full text-xs font-mono">
                                        PostgreSQL
                                    </span>
                                </div>
                            </div>
                            <div className="lg:col-span-8 p-6 md:p-12 flex flex-col justify-center">
                                <p className="text-lg md:text-xl text-zinc-400 text-justify font-light mb-8 max-w-2xl">
                                    Engineered a web-based system designed to streamline and manage dormitory operations.
                                    Developed features for tenant management, room assignment, occupancy tracking, and secure
                                    billing logic to improve administrative efficiency.
                                </p>
                                <a
                                    href="https://dormsync-xi.vercel.app/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full h-48 md:h-64 bg-zinc-950 border border-zinc-800 rounded-lg relative overflow-hidden flex items-center justify-center group-hover:border-zinc-600 transition-colors cursor-pointer"
                                >
                                    <img
                                        src="/dormsync.png"
                                        alt="DormSync"
                                        className="w-full h-full object-cover top-0 left-0 opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    />
                                </a>
                            </div>
                        </div>

                        {/* PROJECT 3 & 4 */}
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-zinc-800 hover:bg-zinc-900 transition-colors flex flex-col h-full gsap-reveal opacity-0">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                                        03 / UI/UX Design
                                    </span>
                                    <span className="font-mono text-xs text-zinc-500">May 2025</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">SAKAY Ride-Hailing</h3>
                                <p className="text-zinc-400 text-justify font-light mb-8 flex-grow">
                                    Lead designer for a ride-hailing application tailored for campus transportation. Focused
                                    heavily on user-centered interfaces to ensure maximum usability, real-time driver tracking,
                                    and accessibility for student passengers and drivers.
                                </p>
                                <Link
                                    to="/case-study/sakay"
                                    className="flex items-center gap-2 text-sm font-mono hover:text-white text-zinc-500 mt-auto w-max group"
                                >
                                    View Case Study{' '}
                                    <ArrowUpRight
                                        size={16}
                                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                    />
                                </Link>
                            </div>
                            <div className="p-6 md:p-12 hover:bg-zinc-900 transition-colors flex flex-col h-full gsap-reveal opacity-0">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                                        04 / Frontend & UI
                                    </span>
                                    <span className="font-mono text-xs text-zinc-500">Oct – Nov 2025</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Bibwak POS & Inventory</h3>
                                <p className="text-zinc-400 text-justify font-light mb-8 flex-grow">
                                    Designed and developed the frontend for a specialized point of sale and inventory management
                                    system for Bibwak Outdoor Shop. Created an intuitive checkout process and stock tracking
                                    optimized for high-volume sales periods.
                                </p>
                                <Link
                                    to="/case-study/bibwak"
                                    className="flex items-center gap-2 text-sm font-mono hover:text-white text-zinc-500 mt-auto w-max group"
                                >
                                    View Case Study{' '}
                                    <ArrowUpRight
                                        size={16}
                                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ABOUT & EDUCATION SECTION */}
                <section id="about" className="border-b border-zinc-800">
                    <div className="p-6 md:p-12 border-b border-zinc-800 gsap-reveal opacity-0">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-7">
                                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6">About Me</h2>
                                <p className="text-lg md:text-xl text-zinc-400 text-justify font-light leading-relaxed mb-6">
                                    A BSIT graduate from <strong className="text-white font-medium">Central Mindanao University</strong>{' '}
                                    (graduated July 10, 2026) dedicated to architecting scalable digital products. Experienced
                                    in building production-grade web systems across both{' '}
                                    <strong className="text-white font-medium">MERN</strong> and{' '}
                                    <strong className="text-white font-medium">TALL</strong> technology stacks.
                                </p>
                                <p className="text-lg md:text-xl text-zinc-400 text-justify font-light leading-relaxed">
                                    With hands-on experience as a Full-Stack Developer Intern at the{' '}
                                    <strong className="text-white font-medium">
                                        Department of Information and Communications Technology (DICT)
                                    </strong>
                                    , I specialize in combining cloud-ready architectures, process automation, and
                                    user-centered design to turn complex operational workflows into seamless user experiences.
                                </p>
                            </div>

                            <div className="lg:col-span-5 bg-zinc-950/70 border border-zinc-800 rounded-lg p-6 font-mono text-sm space-y-5">
                                <div className="flex items-center gap-2 text-zinc-400 border-b border-zinc-800 pb-3">
                                    <GraduationCap size={18} className="text-white" />
                                    <span className="text-xs uppercase tracking-widest text-zinc-400">Education</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-base">Central Mindanao University</h4>
                                    <p className="text-zinc-400 text-xs mt-0.5">College of Information Sciences and Computing</p>
                                    <p className="text-zinc-200 mt-2 font-sans font-medium text-sm">
                                        Bachelor of Science in Information Technology (BSIT)
                                    </p>
                                    <p className="text-zinc-500 text-xs mt-1">Graduation: July 10, 2026 • Maramag, Bukidnon</p>
                                </div>
                                <div className="border-t border-zinc-800 pt-4">
                                    <span className="text-xs uppercase tracking-widest text-zinc-400 block mb-2">
                                        Primary Framework Stacks
                                    </span>
                                    <div className="space-y-1 text-xs text-zinc-300">
                                        <p>
                                            <span className="text-white font-bold">MERN:</span> MongoDB, Express, React, Node.js
                                        </p>
                                        <p>
                                            <span className="text-white font-bold">TALL:</span> Tailwind, Alpine.js, Laravel, Livewire
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CORE COMPETENCES */}
                    <div className="p-6 md:p-12">
                        <div className="mb-10 gsap-reveal opacity-0">
                            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 block">
                                Expertise & Capabilities
                            </span>
                            <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight">Core Competences</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coreCompetences.map((comp) => {
                                const IconComponent = comp.icon;
                                return (
                                    <div
                                        key={comp.title}
                                        className="group p-6 border border-zinc-800 bg-zinc-950/60 rounded-lg hover:border-zinc-600 transition-all duration-300 flex flex-col justify-between gsap-reveal opacity-0"
                                    >
                                        <div>
                                            <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-5 group-hover:text-white group-hover:border-zinc-600 transition-colors">
                                                <IconComponent size={20} />
                                            </div>
                                            <h4 className="text-xl font-bold mb-3">{comp.title}</h4>
                                            <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                                                {comp.desc}
                                            </p>
                                        </div>
                                        <div className="flex gap-1.5 flex-wrap pt-4 border-t border-zinc-900">
                                            {comp.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-0.5 border border-zinc-800 rounded-full text-[10px] font-mono text-zinc-400 bg-zinc-900/30"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* EXPERIENCE SECTION */}
                <section id="experience" className="border-b border-zinc-800">
                    <div className="p-6 md:p-12">
                        <div className="mb-12 gsap-reveal opacity-0">
                            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 block">
                                Track Record
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">
                                Work Experience & Hackathons
                            </h2>
                        </div>

                        <div className="flex flex-col gap-10">
                            {/* EXPERIENCE 1: DICT */}
                            <div className="group border-b border-zinc-800 pb-10 hover:border-zinc-600 transition-all duration-300 gsap-reveal opacity-0">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 items-start">
                                    <div className="lg:col-span-8">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <span className="px-2.5 py-0.5 border border-zinc-700 bg-zinc-900/60 rounded-full text-[10px] font-mono text-white uppercase tracking-widest">
                                                Government Internship
                                            </span>
                                            <span className="font-mono text-xs text-zinc-500">Provincial Office</span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                                            Department of Information and Communications Technology (DICT)
                                        </h3>
                                        <p className="text-lg text-zinc-300 font-medium mt-1">Full-Stack Developer Intern</p>
                                    </div>
                                    <div className="lg:col-span-4 flex flex-col lg:items-end space-y-2 font-mono text-sm text-zinc-500 uppercase tracking-widest">
                                        <p className="flex items-center gap-2">
                                            <Calendar size={14} /> February 2026 – May 2026
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <MapPin size={14} /> Malaybalay, Bukidnon
                                        </p>
                                    </div>
                                </div>

                                <ul className="space-y-2.5 text-zinc-400 font-light text-base max-w-4xl mb-6 pl-5 list-disc marker:text-zinc-600">
                                    <li>
                                        Developed a <strong className="text-zinc-200 font-medium">Project Monitoring System</strong> for the provincial office using Google Workspace and Google Apps Script to automate task workflows.
                                    </li>
                                    <li>
                                        Created a centralized <strong className="text-zinc-200 font-medium">Google Sites dashboard</strong> to streamline operational tracking, status visualization, and executive reporting.
                                    </li>
                                    <li>
                                        Managed administrative tasks and operational data workflows to support daily office functions alongside technical initiatives.
                                    </li>
                                </ul>

                                <div className="flex gap-2 flex-wrap items-center">
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        Google Workspace
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        Google Apps Script
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        Google Sites
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        Workflow Automation
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        Project Monitoring
                                    </span>
                                </div>
                            </div>

                            {/* EXPERIENCE 2: TECHNOPRENEURSHIP (SAKAY) */}
                            <div className="group border-b border-zinc-800 pb-10 hover:border-zinc-600 transition-all duration-300 gsap-reveal opacity-0">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 items-start">
                                    <div className="lg:col-span-8">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <span className="px-2.5 py-0.5 border border-zinc-700 bg-zinc-900/60 rounded-full text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                                                Startup Venture
                                            </span>
                                            <span className="font-mono text-xs text-zinc-500">Campus Mobility</span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                                            From Vision to Venture - Technopreneurship
                                        </h3>
                                        <p className="text-lg text-zinc-300 font-medium mt-1">UI/UX Designer (Hipster)</p>
                                    </div>
                                    <div className="lg:col-span-4 flex flex-col lg:items-end space-y-2 font-mono text-sm text-zinc-500 uppercase tracking-widest">
                                        <p className="flex items-center gap-2">
                                            <Calendar size={14} /> May 2025
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <MapPin size={14} /> Maramag, Bukidnon
                                        </p>
                                    </div>
                                </div>

                                <ul className="space-y-2.5 text-zinc-400 font-light text-base max-w-4xl mb-6 pl-5 list-disc marker:text-zinc-600">
                                    <li>
                                        Served as the lead designer for <strong className="text-zinc-200 font-medium">"SAKAY,"</strong> a ride-hailing application tailored specifically for campus and student transportation.
                                    </li>
                                    <li>
                                        Designed user-centered interfaces and interaction models to ensure usability and accessibility for both students and drivers.
                                    </li>
                                </ul>

                                <div className="flex gap-2 flex-wrap items-center">
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        Figma
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        Miro
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        UI/UX Design
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        Interactive Prototyping
                                    </span>
                                    <Link
                                        to="/case-study/sakay"
                                        className="ml-auto inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                                    >
                                        View Case Study <ArrowUpRight size={13} />
                                    </Link>
                                </div>
                            </div>

                            {/* EXPERIENCE 3: DIGI AGRI HACKATHON */}
                            <div className="group border-b border-zinc-800 pb-10 hover:border-zinc-600 transition-all duration-300 gsap-reveal opacity-0">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 items-start">
                                    <div className="lg:col-span-8">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <span className="px-2.5 py-0.5 border border-zinc-700 bg-zinc-900/60 rounded-full text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                                                Hackathon Competition
                                            </span>
                                            <span className="font-mono text-xs text-zinc-500">AgriTech Focus</span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold leading-tight">Digi Agri Hackathon</h3>
                                        <p className="text-lg text-zinc-300 font-medium mt-1">UI/UX Designer (Hipster)</p>
                                    </div>
                                    <div className="lg:col-span-4 flex flex-col lg:items-end space-y-2 font-mono text-sm text-zinc-500 uppercase tracking-widest">
                                        <p className="flex items-center gap-2">
                                            <Calendar size={14} /> April 28, 2025
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <MapPin size={14} /> Cagayan de Oro City
                                        </p>
                                    </div>
                                </div>

                                <ul className="space-y-2.5 text-zinc-400 font-light text-base max-w-4xl mb-6 pl-5 list-disc marker:text-zinc-600">
                                    <li>
                                        Designed the UI/UX of a comprehensive digital agricultural solution tailored to address specific operational needs of local farmers.
                                    </li>
                                    <li>
                                        Focused on usability, high contrast accessibility, and user-centered design principles to significantly enhance farmer engagement with data tools.
                                    </li>
                                </ul>

                                <div className="flex gap-2 flex-wrap items-center">
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        AgriTech
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        UI/UX Design
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        Accessibility
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        Farmer-Centric Solutions
                                    </span>
                                </div>
                            </div>

                            {/* EXPERIENCE 4: BUKIDNON INTER-CAMPUS TECH COMP */}
                            <div className="group pb-4 hover:border-zinc-600 transition-all duration-300 gsap-reveal opacity-0">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 items-start">
                                    <div className="lg:col-span-8">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <span className="px-2.5 py-0.5 border border-zinc-700 bg-zinc-900/60 rounded-full text-[10px] font-mono text-white uppercase tracking-widest">
                                                2nd Place Awardee
                                            </span>
                                            <span className="font-mono text-xs text-zinc-500">Collegiate Web Design</span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                                            Bukidnon Inter-Campus Technology Competition
                                        </h3>
                                        <p className="text-lg text-zinc-300 font-medium mt-1">Web Designer / Collaborator</p>
                                    </div>
                                    <div className="lg:col-span-4 flex flex-col lg:items-end space-y-2 font-mono text-sm text-zinc-500 uppercase tracking-widest">
                                        <p className="flex items-center gap-2">
                                            <Calendar size={14} /> December 11, 2024
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <MapPin size={14} /> Maramag, Bukidnon
                                        </p>
                                    </div>
                                </div>

                                <ul className="space-y-2.5 text-zinc-400 font-light text-base max-w-4xl mb-6 pl-5 list-disc marker:text-zinc-600">
                                    <li>
                                        Collaborated in designing a modern website showcasing innovative technological ideas with a creative, interactive interface.
                                    </li>
                                    <li>
                                        Achieved <strong className="text-white font-medium">2nd place</strong> among all participating collegiate teams from across the province.
                                    </li>
                                </ul>

                                <div className="flex gap-2 flex-wrap items-center">
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        Web Design
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        Frontend Engineering
                                    </span>
                                    <span className="px-3 py-1 border border-zinc-800 bg-zinc-900/60 rounded-full text-xs font-mono text-zinc-400">
                                        Competitive Collaboration
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CERTIFICATES SECTION */}
                <section id="certificates" className="border-b border-zinc-800">
                    <div className="p-6 md:p-12">
                        <div className="mb-8 gsap-reveal opacity-0">
                            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 block">
                                Credentials & Recognitions
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">Certificates</h2>
                            <p className="text-lg text-zinc-400 font-light mt-2 max-w-2xl">
                                Official certifications from government institutions, hackathons, academic honors, and
                                professional training programs.
                            </p>
                        </div>

                        {/* Image Certificates Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {imageCerts.map((cert, index) => (
                                <div
                                    key={cert.title}
                                    className="group border border-zinc-800 bg-zinc-950 rounded-lg overflow-hidden hover:border-zinc-600 transition-all duration-300 cursor-pointer gsap-reveal opacity-0"
                                    onClick={() => openLightbox(index)}
                                >
                                    <div className="relative h-48 md:h-56 overflow-hidden">
                                        <img
                                            src={cert.src}
                                            alt={cert.title}
                                            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                                    </div>
                                    <div className="p-4 flex items-start justify-between gap-3">
                                        <div>
                                            <h4 className="font-bold text-sm mb-1">{cert.title}</h4>
                                            <span className="px-2 py-0.5 border border-zinc-700 rounded-full text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                                                {cert.category}
                                            </span>
                                        </div>
                                        <Award size={16} className="text-zinc-600 mt-1 shrink-0" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* PDF Certificates */}
                        <div className="gsap-reveal opacity-0">
                            <h3 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <FileText size={20} className="text-zinc-500" />
                                Document Certificates & Credentials
                            </h3>
                            <div className="flex flex-col gap-4">
                                {certificates
                                    .filter((c) => c.type === 'pdf')
                                    .map((cert) => (
                                        <a
                                            key={cert.title}
                                            href={cert.src}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group grid grid-cols-1 md:grid-cols-2 gap-4 border border-zinc-800 rounded-lg p-5 hover:border-zinc-600 hover:bg-zinc-900/50 transition-all duration-300 items-center"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center shrink-0 group-hover:bg-zinc-700 transition-colors">
                                                    <FileText size={18} className="text-zinc-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm">{cert.title}</h4>
                                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                                                        PDF Document
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center md:justify-end gap-2">
                                                <span className="px-2 py-0.5 border border-zinc-700 rounded-full text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                                                    {cert.category}
                                                </span>
                                                <ArrowUpRight
                                                    size={14}
                                                    className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                                                />
                                            </div>
                                        </a>
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CONTACT / FOOTER */}
                <footer
                    id="contact"
                    className="p-6 md:p-12 pb-24 md:pb-32 relative overflow-hidden flex flex-col items-center justify-center text-center"
                >
                    <div
                        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle at 50% 100%, #333 0%, transparent 50%)' }}
                    ></div>

                    <h2 className="text-[10vw] md:text-[120px] font-black uppercase tracking-tighter leading-none mb-8 z-10 hover:text-zinc-300 transition-colors cursor-pointer gsap-reveal opacity-0">
                        Let's Talk.
                    </h2>

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 z-10 font-mono text-sm uppercase tracking-widest mt-8 gsap-reveal opacity-0">
                        <a
                            href="mailto:lagrosascydiemar@gmail.com"
                            className="flex items-center gap-2 hover:text-white text-zinc-400 transition-colors group"
                        >
                            <Mail size={18} /> lagrosascydiemar@gmail.com
                            <ArrowUpRight
                                size={16}
                                className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                            />
                        </a>
                        <a
                            href="tel:+639354477276"
                            className="flex items-center gap-2 hover:text-white text-zinc-400 transition-colors"
                        >
                            +63 935 447 7276
                        </a>
                        <div className="flex gap-6 mt-4 md:mt-0 md:ml-8 border-t md:border-t-0 md:border-l border-zinc-800 pt-4 md:pt-0 md:pl-8">
                            <a
                                href="https://linkedin.com/in/cydiemar-lagrosas-0111033b5"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-white text-zinc-400 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="https://github.com/prettyewil"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-white text-zinc-400 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="mt-24 z-10 flex w-full justify-center items-center border-t border-zinc-800 pt-8 font-mono text-xs text-zinc-600 uppercase gsap-reveal opacity-0">
                        <p>© 2026 Cydiemar O. Lagrosas. All rights reserved.</p>
                    </div>
                </footer>
            </main>

            {/* LIGHTBOX MODAL */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors z-[110]"
                        aria-label="Close lightbox"
                    >
                        <X size={28} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                        }}
                        className="absolute left-4 md:left-8 text-zinc-400 hover:text-white transition-colors z-[110]"
                        aria-label="Previous certificate"
                    >
                        <ChevronLeft size={36} />
                    </button>

                    <div className="max-w-4xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={imageCerts[lightboxIndex].src}
                            alt={imageCerts[lightboxIndex].title}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg border border-zinc-700"
                        />
                        <div className="text-center mt-4">
                            <p className="text-white font-bold">{imageCerts[lightboxIndex].title}</p>
                            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-1">
                                {lightboxIndex + 1} / {imageCerts.length} — {imageCerts[lightboxIndex].category}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                        }}
                        className="absolute right-4 md:right-8 text-zinc-400 hover:text-white transition-colors z-[110]"
                        aria-label="Next certificate"
                    >
                        <ChevronRight size={36} />
                    </button>
                </div>
            )}
        </div>
    );
}
