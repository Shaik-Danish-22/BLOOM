"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Sparkles, Send, Globe, Shield, Cpu, Zap, ArrowUpRight, Instagram, Linkedin, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function LandingPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleFade = () => {
      const remainingTime = video.duration - video.currentTime;
      if (remainingTime <= 0.55) {
        video.style.opacity = "0";
      } else {
        video.style.opacity = "1";
      }
    };

    video.addEventListener("timeupdate", handleFade);
    return () => video.removeEventListener("timeupdate", handleFade);
  }, []);

  const handleInitialize = () => {
    if (!prompt.trim()) return;
    localStorage.setItem("current_prompt", prompt);
    router.push("/generate");
  };

  return (
    <div ref={containerRef} className="relative bg-black text-white selection:bg-white/20 overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-bottom z-0 transition-opacity duration-500"
          onCanPlay={(e) => (e.currentTarget.style.opacity = "1")}
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
              <button className="text-white text-sm font-medium">Sign Up</button>
              <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-all">
                Login
              </button>
            </div>
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center -translate-y-[10%]">
          <motion.h1 
            {...fadeUp(0.2)}
            className="text-7xl md:text-8xl lg:text-9xl font-headline leading-none tracking-tight mb-8"
          >
            Know it then <em className="italic font-normal">all</em>.
          </motion.h1>

          <motion.div 
            {...fadeUp(0.4)}
            className="w-full max-w-xl mb-8"
          >
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
              <input 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleInitialize()}
                placeholder="Describe your startup vision..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-white/40 text-base"
              />
              <button 
                onClick={handleInitialize}
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
            Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
          </motion.p>

          <motion.button
            {...fadeUp(0.8)}
            className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            The Manifesto
          </motion.button>
        </div>

        {/* SOCIAL FOOTER */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          {[Instagram, Twitter, Globe].map((Icon, i) => (
            <button key={i} className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
              <Icon size={20} />
            </button>
          ))}
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
            About Siteforge OS
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

      {/* SECTION 3: FEATURED VIDEO */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            {...fadeUp(0)}
            className="rounded-3xl overflow-hidden aspect-video relative group"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row items-end justify-between gap-8">
              <div className="liquid-glass rounded-2xl p-8 max-w-md">
                <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold mb-4 block">Our Approach</span>
                <p className="text-white text-sm md:text-base leading-relaxed font-light">
                  We believe in the power of curiosity-driven exploration. Every project starts with a question, and every answer opens a new door to innovation.
                </p>
              </div>
              <Button className="bg-white text-black hover:bg-white/90 rounded-full px-10 h-14 font-bold text-xs uppercase tracking-widest transition-transform hover:scale-105 active:scale-95">
                Explore More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: PHILOSOPHY */}
      <section className="bg-black py-32 md:py-44 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            {...fadeUp(0)}
            className="text-5xl md:text-8xl font-headline tracking-tight mb-24"
          >
            Innovation <em className="italic text-white/20">x</em> Vision
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp(0.2)} className="rounded-3xl overflow-hidden aspect-[4/3]">
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4" />
              </video>
            </motion.div>
            
            <div className="space-y-16">
              <motion.div {...fadeUp(0.4)} className="space-y-6">
                <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold">Choose your space</span>
                <p className="text-white/70 text-lg leading-relaxed font-light">
                  Every meaningful breakthrough begins at the intersection of disciplined strategy and remarkable creative vision. We operate at that crossroads, turning bold thinking into tangible outcomes.
                </p>
              </motion.div>
              <div className="w-full h-px bg-white/10" />
              <motion.div {...fadeUp(0.6)} className="space-y-6">
                <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold">Shape the future</span>
                <p className="text-white/70 text-lg leading-relaxed font-light">
                  We believe that the best work emerges when curiosity meets conviction. Our process is designed to uncover hidden opportunities and translate them into experiences.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SERVICES */}
      <section className="bg-black py-32 md:py-44 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-24">
            <motion.h3 {...fadeUp(0)} className="text-4xl md:text-6xl font-headline tracking-tight">What we do</motion.h3>
            <motion.span {...fadeUp(0.2)} className="hidden md:block text-white/40 text-xs tracking-widest uppercase">Our Services</motion.span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                tag: "Strategy",
                title: "Research & Insight",
                desc: "We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.",
                video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
              },
              {
                tag: "Craft",
                title: "Design & Execution",
                desc: "From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.",
                video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                {...fadeUp(i * 0.2)}
                className="liquid-glass rounded-3xl overflow-hidden group cursor-pointer"
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
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-white/30 text-xs tracking-widest uppercase font-bold">© 2026 Siteforge OS — FounderOS Intelligence</span>
          <div className="flex gap-10">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <button key={item} className="text-white/30 hover:text-white text-xs tracking-widest uppercase font-bold transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}