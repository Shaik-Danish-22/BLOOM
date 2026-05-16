
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Globe, Instagram, Twitter, Linkedin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function LandingPage() {
  const router = useRouter();
  const auth = useAuth();
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (user) router.push('/workspace');
  }, [user, router]);

  const handleAuth = async () => {
    if (!auth) return;
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) {
      console.error(e);
    }
  };

  const handleStart = () => {
    if (!user) {
      handleAuth();
    } else {
      router.push('/workspace');
    }
  };

  return (
    <div className="relative bg-black text-white selection:bg-white/20 overflow-x-hidden font-body">
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-bottom z-0 transition-opacity duration-500"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-0" />

        {/* NAVBAR */}
        <nav className="relative z-20 px-6 py-6 w-full">
          <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-white" />
                <span className="text-lg font-bold tracking-tighter">SITEFORGE</span>
              </div>
              <div className="hidden md:flex gap-8">
                {["Features", "Pricing", "About"].map((link) => (
                  <button key={link} className="text-white/60 hover:text-white text-sm font-medium transition-colors">
                    {link}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-6">
              {user ? (
                <button onClick={() => router.push('/workspace')} className="text-white text-sm font-medium">Go to Workspace</button>
              ) : (
                <>
                  <button onClick={handleAuth} className="text-white text-sm font-medium">Sign Up</button>
                  <button onClick={handleAuth} className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-all">
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center -translate-y-[10%]">
          <motion.h1 
            {...fadeUp(0.2)}
            className="text-7xl md:text-8xl lg:text-9xl font-headline leading-none tracking-tight mb-8"
          >
            Know it then <em className="italic font-normal text-white/40">all</em>.
          </motion.h1>

          <motion.div 
            {...fadeUp(0.4)}
            className="w-full max-w-xl mb-8"
          >
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
              <input 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your startup vision..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-white/40 text-base"
              />
              <button 
                onClick={handleStart}
                className="bg-white rounded-full p-3 text-black hover:scale-105 active:scale-95 transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.p 
            {...fadeUp(0.6)}
            className="text-white/40 text-sm max-w-lg leading-relaxed mb-8"
          >
            Watch your startup architecture materialize in real-time. Powered by FounderOS Intelligence.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className="relative bg-black pt-32 md:pt-44 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
        <div className="max-w-6xl mx-auto">
          <motion.span 
            {...fadeUp(0)}
            className="text-white/40 text-xs tracking-[0.4em] uppercase font-bold mb-8 block"
          >
            Siteforge Intelligence
          </motion.span>
          <motion.h2 
            {...fadeUp(0.2)}
            className="text-4xl md:text-6xl lg:text-7xl font-headline leading-[1.1] tracking-tight"
          >
            Pioneering <em className="italic text-white/60">ideas</em> for <br className="hidden md:block" />
            minds that <em className="italic text-white/60">create, build, and inspire</em>.
          </motion.h2>
        </div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section className="bg-black py-32 md:py-44 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                tag: "Insight",
                title: "Research & Oracle",
                desc: "We dive deep into market friction points to surface the insights that drive meaningful, lasting change.",
                video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
              },
              {
                tag: "Materialize",
                title: "Design & Execution",
                desc: "From concept to launch, watch as the FounderOS team builds your startup identity live on the canvas.",
                video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                {...fadeUp(i * 0.2)}
                className="liquid-glass rounded-[48px] overflow-hidden group cursor-pointer"
              >
                <div className="aspect-video overflow-hidden">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <source src={service.video} type="video/mp4" />
                  </video>
                </div>
                <div className="p-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold">{service.tag}</span>
                    <div className="liquid-glass rounded-full p-3 group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold mb-4 tracking-tight text-white">{service.title}</h4>
                  <p className="text-white/50 text-base leading-relaxed font-light">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-white/30 text-xs tracking-widest uppercase font-bold">
          <span>© 2026 Siteforge AI — Powered by FounderOS</span>
          <div className="flex gap-10">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <button key={item} className="hover:text-white transition-colors">{item}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
