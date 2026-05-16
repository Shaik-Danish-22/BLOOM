
"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Visionary",
    price: "$49",
    description: "For individual creators materializing their first neural concepts.",
    features: [
      "10 Neural Materializations / mo",
      "Advanced Design DNA Export",
      "Standard Sissor Assistant",
      "Community Access"
    ]
  },
  {
    name: "Architect",
    price: "$149",
    description: "For professional teams building high-density startup identities.",
    features: [
      "Unlimited Materializations",
      "Priority Neural Compute",
      "Oracle Pro Viability Testing",
      "Custom Brand Logic",
      "Dedicated Agent Access"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations scaling AI transformation across departments.",
    features: [
      "Self-hosted Neural Nodes",
      "Custom Multi-Agent Teams",
      "Enterprise Data Privacy",
      "SLA-backed Materialization"
    ]
  }
];

export function PricingSection() {
  return (
    <section className="bg-black py-28 md:py-40 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4">
          <span className="text-white/40 text-sm tracking-widest uppercase block font-bold">Neural Subscriptions</span>
          <h2 className="text-4xl md:text-6xl text-white tracking-tight font-display italic">Choose your <em className="italic text-white/60">intensity.</em></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`liquid-glass p-10 rounded-[2.5rem] flex flex-col ${
                tier.popular ? 'bg-white/[0.03] border-white/10 ring-1 ring-white/10' : ''
              }`}
            >
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-headline italic">{tier.name}</h3>
                  {tier.popular && (
                    <div className="bg-[#DCFF00] text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Most Active
                    </div>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-headline">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-white/40 text-sm">/mo</span>}
                </div>
                <p className="text-sm text-white/40 mt-4 leading-relaxed">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm text-white/60 font-light">
                    <Check className="w-4 h-4 text-[#DCFF00] shrink-0 mt-0.5" />
                    {feature}
                  </div>
                ))}
              </div>

              <Button className={`w-full rounded-full h-14 font-bold uppercase tracking-widest transition-all ${
                tier.popular 
                  ? 'bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)]' 
                  : 'liquid-glass text-white hover:bg-white/5'
              }`}>
                {tier.price === 'Custom' ? 'Contact Us' : 'Get Started'}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
