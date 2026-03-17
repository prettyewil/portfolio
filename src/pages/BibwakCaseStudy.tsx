import { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BibwakCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-text-bibwak',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
      );

      gsap.utils.toArray<Element>('.gsap-reveal-bibwak').forEach((elem) => {
        gsap.fromTo(elem,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pb-24">

      {/* Sticky Nav */}
      <nav className="sticky top-0 w-full border-b border-zinc-800 bg-[#0a0a0a]/90 backdrop-blur-md z-50 px-6 md:px-12 py-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-mono text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
      </nav>

      <main className="pt-12 md:pt-24 px-6 md:px-12 max-w-5xl mx-auto">

        {/* ── HERO ── */}
        <header className="mb-16 md:mb-24 border-b border-zinc-800 pb-12">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-6 block hero-text-bibwak opacity-0">
            Case Study / Frontend & UI
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-6 hero-text-bibwak opacity-0">
            BIBWAK
            <span className="text-zinc-600 block">Integrated POS &amp; Inventory System</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl hero-text-bibwak opacity-0">
            A full-featured Point of Sale and Inventory Management System built for Bibwak Outdoor Shop — an outdoor gear retailer selling camping tools, apparel, boots, and survival kits.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 hero-text-bibwak opacity-0">
            <div>
              <span className="block font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">Role</span>
              <span className="text-zinc-300">Frontend Developer</span>
            </div>
            <div>
              <span className="block font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">Platform</span>
              <span className="text-zinc-300">Web / Desktop</span>
            </div>
            <div>
              <span className="block font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">Tech Stack</span>
              <span className="text-zinc-300">React, Tailwind CSS</span>
            </div>
            <div>
              <span className="block font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">Domain</span>
              <span className="text-zinc-300">Retail / E-commerce</span>
            </div>
          </div>
        </header>

        {/* ── OVERVIEW ── */}
        <section className="mb-20 gsap-reveal-bibwak opacity-0">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6">01. Overview</h2>
          <div className="space-y-5 text-lg text-zinc-400 font-light leading-relaxed max-w-4xl">
            <p>
              Bibwak Outdoor Shop required a cohesive digital system to replace their fragmented, manual workflows. Cashiers were reconciling paper receipts, inventory was tracked in spreadsheets, and managers had no real-time visibility into sales performance or stock health.
            </p>
            <p>
              The solution was a unified web application with three tightly integrated modules: an Admin Dashboard for at-a-glance business intelligence, a granular Inventory Manager, and a fluid Point of Sale interface capable of handling high-throughput checkout sessions.
            </p>
          </div>
        </section>

        {/* ── CHALLENGE ── */}
        <section className="mb-20 gsap-reveal-bibwak opacity-0">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6">02. The Challenge</h2>
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-10 rounded-lg">
            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed italic border-l-2 border-white pl-6">
              "During peak seasons, cashiers struggled with slow lookup times and manual tax computations, leading to long queues and frequent pricing errors."
            </p>
          </div>
        </section>

        {/* ── SCREEN 1: Dashboard ── */}
        <section className="mb-20 gsap-reveal-bibwak opacity-0">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">03. Admin Dashboard</h2>
          <p className="text-zinc-400 font-light leading-relaxed mb-8 max-w-3xl text-lg">
            The dashboard gives store managers an immediate snapshot of business health — total revenue, low-stock alerts, transaction counts, and quick-action shortcuts. The Low Stock Alert panel surfaces critical items (e.g., items with fewer than 10 units) automatically, removing the need for manual audits.
          </p>
          <div className="w-full border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
            <div className="px-4 py-2 border-b border-zinc-800 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
              <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
              <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
              <span className="ml-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">Admin Dashboard</span>
            </div>
            <img
              src="/bibwak-dashboard.png"
              alt="Bibwak Admin Dashboard"
              className="w-full object-cover"
            />
          </div>
        </section>

        {/* ── SCREEN 2: Inventory ── */}
        <section className="mb-20 gsap-reveal-bibwak opacity-0">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">04. Inventory Management</h2>
          <p className="text-zinc-400 font-light leading-relaxed mb-8 max-w-3xl text-lg">
            The inventory module provides a searchable, filterable product catalog with real-time stock status badges (In Stock / Low Stock). Store staff can add, edit, or remove products from a single interface without navigating away, keeping product data consistently accurate.
          </p>
          <div className="w-full border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
            <div className="px-4 py-2 border-b border-zinc-800 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
              <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
              <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
              <span className="ml-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">Inventory Management</span>
            </div>
            <img
              src="/bibwak-inventory.png"
              alt="Bibwak Inventory Management"
              className="w-full object-cover"
            />
          </div>
        </section>

        {/* ── SCREEN 3: POS ── */}
        <section className="mb-20 gsap-reveal-bibwak opacity-0">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">05. Point of Sale</h2>
          <p className="text-zinc-400 font-light leading-relaxed mb-8 max-w-3xl text-lg">
            The POS module features a split-pane layout: a browse/search panel on the left organized by product category (Camping Tools, Outdoor Apparel, Boots, Emergency Tools, Survival Kits) and a persistent Shopping Cart on the right. Automatic tax computation (8%), live item counts, and a one-click "Complete Sale" flow cut average checkout time significantly.
          </p>
          <div className="w-full border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
            <div className="px-4 py-2 border-b border-zinc-800 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
              <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
              <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
              <span className="ml-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">Point of Sale</span>
            </div>
            <img
              src="/bibwak-pos.png"
              alt="Bibwak Point of Sale"
              className="w-full object-cover"
            />
          </div>
        </section>

        {/* ── KEY FEATURES ── */}
        <section className="mb-20 gsap-reveal-bibwak opacity-0">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-8">06. Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Category Filtering', desc: 'Products are organized into five distinct categories for rapid browsing and barcode/search lookup.' },
              { num: '02', title: 'Auto Tax Computation', desc: 'The cart automatically applies an 8% tax rate and calculates subtotals and totals in real time.' },
              { num: '03', title: 'Low Stock Alerts', desc: 'Dashboard and inventory views surface low-stock products, enabling proactive restocking before stockouts occur.' },
              { num: '04', title: 'Discount Support', desc: 'Cashiers can apply manual discounts per transaction, with the total recalculated instantly.' },
              { num: '05', title: 'Product CRUD', desc: 'Managers can add, edit, and delete products with name, description, price, stock, category, and image.' },
              { num: '06', title: 'Revenue Tracking', desc: 'The admin dashboard aggregates all-time revenue, today\'s revenue, and completed transaction counts.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="p-6 border border-zinc-800 bg-zinc-950 hover:border-zinc-600 transition-colors rounded-sm">
                <span className="block font-mono text-xs text-zinc-600 uppercase tracking-widest mb-3">{num}</span>
                <h3 className="text-lg font-bold mb-3">{title}</h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── OUTCOME ── */}
        <section className="mb-20 gsap-reveal-bibwak opacity-0">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6">07. Outcome</h2>
          <div className="space-y-5 text-lg text-zinc-400 font-light leading-relaxed max-w-4xl">
            <p>
              The integrated system eliminated manual reconciliation entirely. Cashiers could complete a full sale — including tax and discount — in a fraction of the previous time. Store managers gained real-time visibility into revenue and stock, enabling data-driven restocking decisions for peak outdoor seasons.
            </p>
            <p>
              Building the frontend, I prioritized a clean, high-contrast visual language that remains readable under harsh lighting conditions common in retail environments, while keeping the UI lightweight enough to run smoothly on modest hardware.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
