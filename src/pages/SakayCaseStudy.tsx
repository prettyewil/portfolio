import { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SakayCaseStudy() {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on mount

        if (!pageRef.current) return;

        const ctx = gsap.context(() => {
            // Hero text animation
            gsap.fromTo(".hero-text-sakay",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.1 }
            );

            // Scroll reveals
            gsap.utils.toArray<Element>('.gsap-reveal-sakay').forEach((elem) => {
                gsap.fromTo(elem,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="pb-24">
            {/* Sticky Header with Back Button */}
            <nav className="sticky top-0 w-full border-b border-zinc-800 bg-[#0a0a0a]/90 backdrop-blur-md z-50 px-6 md:px-12 py-4">
                <Link to="/" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-mono text-zinc-400 hover:text-white transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </Link>
            </nav>

            <main className="pt-12 md:pt-24 px-6 md:px-12 max-w-5xl mx-auto">

                {/* Case Study Header */}
                <header className="mb-16 md:mb-24 border-b border-zinc-800 pb-12">
                    <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-6 block hero-text-sakay opacity-0">Case Study / UI-UX Design</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-6 hero-text-sakay opacity-0">
                        SAKAY Ride-Hailing <span className="text-zinc-600 block">App Design</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl hero-text-sakay opacity-0">
                        A comprehensive UX/UI case study focused on creating an accessible, efficient, and user-friendly ride-hailing platform tailored specifically for campus transportation needs.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 hero-text-sakay opacity-0">
                        <div>
                            <span className="block font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">Role</span>
                            <span className="text-zinc-300">Lead UI/UX Designer</span>
                        </div>
                        <div>
                            <span className="block font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">Timeline</span>
                            <span className="text-zinc-300">Mar 2025</span>
                        </div>
                        <div>
                            <span className="block font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">Tools</span>
                            <span className="text-zinc-300">Figma, Miro</span>
                        </div>
                        <div>
                            <span className="block font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">Platform</span>
                            <span className="text-zinc-300">Mobile (iOS & Android)</span>
                        </div>
                    </div>
                </header>

                {/* Overview Section */}
                <section className="mb-20 gsap-reveal-sakay opacity-0">
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6">01. Overview</h2>
                    <div className="prose prose-invert prose-zinc max-w-none prose-p:text-zinc-400 prose-p:font-light prose-p:leading-relaxed prose-p:text-lg">
                        <p>
                            Sakay is an innovative ride-hailing application specifically developed to address the unique transportation challenges faced by university students and faculty within and around campus grounds. The goal was to provide a safe, reliable, and affordable commuting alternative.
                        </p>
                        <p>
                            Through extensive user research, we identified key pain points in traditional campus transport, including long wait times, unpredictable schedules, and safety concerns during late hours. Sakay was designed from the ground up to solve these exact issues with a streamlined, intuitive interface.
                        </p>
                    </div>
                </section>

                {/* Problem Statement Section */}
                <section className="mb-20 gsap-reveal-sakay opacity-0">
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6">02. The Problem</h2>
                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-10 rounded-lg">
                        <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed italic border-l-2 border-white pl-6">
                            "Students and faculty struggle with unreliable shuttle schedules and unsafe late-night commuting options, leading to increased stress and recurring tardiness."
                        </p>
                    </div>
                </section>

                {/* The Solution */}
                <section className="mb-20 gsap-reveal-sakay opacity-0">
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6">03. The Solution</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 border border-zinc-800 bg-zinc-950 hover:border-zinc-600 transition-colors">
                            <div className="w-12 h-12 bg-white text-black flex items-center justify-center font-bold text-xl mb-6 rounded-sm">1</div>
                            <h3 className="text-xl font-bold mb-3">Real-time Tracking</h3>
                            <p className="text-zinc-400 font-light text-sm">Live GPS integration allows users to see exactly where their assigned driver is and receive accurate ETAs.</p>
                        </div>
                        <div className="p-6 border border-zinc-800 bg-zinc-950 hover:border-zinc-600 transition-colors">
                            <div className="w-12 h-12 bg-white text-black flex items-center justify-center font-bold text-xl mb-6 rounded-sm">2</div>
                            <h3 className="text-xl font-bold mb-3">Campus Geo-fencing</h3>
                            <p className="text-zinc-400 font-light text-sm">Optimized routing specifically tailored to campus buildings, dorms, and local transit hubs.</p>
                        </div>
                        <div className="p-6 border border-zinc-800 bg-zinc-950 hover:border-zinc-600 transition-colors">
                            <div className="w-12 h-12 bg-white text-black flex items-center justify-center font-bold text-xl mb-6 rounded-sm">3</div>
                            <h3 className="text-xl font-bold mb-3">Safety First</h3>
                            <p className="text-zinc-400 font-light text-sm">Integrated SOS features, ride sharing with trusted contacts, and verified campus-only drivers.</p>
                        </div>
                    </div>
                </section>


                {/* Prototype Demo Section */}
                <section className="mb-20 gsap-reveal-sakay opacity-0">
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">05. Prototype Demo</h2>
                    <p className="text-zinc-400 font-light leading-relaxed text-lg mb-8">
                        Watch the interactive prototype walkthrough showcasing the core user flows — from booking a ride to real-time driver tracking, built and tested in Figma.
                    </p>
                    <div className="w-full rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
                        <video
                            className="w-full"
                            controls
                            muted
                            controlsList="nodownload"
                            playsInline
                            preload="metadata"
                        >
                            <source src="/prototypeDemo1.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <p className="mt-4 font-mono text-xs text-zinc-600 uppercase tracking-widest">
                        Prototype walkthrough — Sakay Ride-Hailing App
                    </p>
                </section>

            </main>
        </div>
    );
}
