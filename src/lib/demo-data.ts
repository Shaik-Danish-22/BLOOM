import { StartupIdeaOutput } from "@/ai/flows/generate-startup-idea";
import { GenerateOracleInvestorScoreOutput } from "@/ai/flows/generate-oracle-investor-score";

export const DEMO_STARTUP: StartupIdeaOutput = {
  forgeBrandArchitect: {
    companyName: "NexusFlow",
    tagline: "The Neural Highway for Enterprise Logistics",
    brandRationale: "NexusFlow combines 'Nexus' (connection) with 'Flow' (optimized movement). The brand uses high-contrast obsidian and radiant violet to project technical authority and future-forward efficiency."
  },
  websiteContent: {
    sections: [
      {
        id: "hero-1",
        type: "hero",
        title: "Autonomous Logistics for the Modern Enterprise",
        subtitle: "Neural-driven routing that eliminates supply chain friction before it happens.",
        content: "Experience the future of global trade with our predictive routing engine."
      },
      {
        id: "feat-1",
        type: "features",
        title: "The Neural Advantage",
        subtitle: "Proprietary AI systems designed for global scale.",
        items: [
          "Predictive Weather Integration",
          "Real-time Port Congestion Mapping",
          "Autonomous Cargo Correction",
          "Enterprise-grade Security Protocols"
        ]
      }
    ],
    colorPalette: ["#000000", "#9F5CF0", "#FFFFFF"]
  },
  sentinelAtlasMarketIntelligence: {
    marketOpportunityAnalysis: "Supply chain inefficiencies currently cost Fortune 500 companies $400B+ annually. NexusFlow leverages predictive AI to eliminate the 'last-mile' friction points in global trade.",
    tamSamSom: {
      tam: "$15.6 Trillion Global Logistics Market",
      sam: "$240 Billion AI Logistics Software Segment",
      som: "$2.4 Billion focused on high-value fragile goods in North America"
    },
    competitorInsights: [
      {
        name: "Flexport",
        description: "Leading digital freight forwarder.",
        advantages: ["Scale", "Deep data pools"],
        disadvantages: ["Heavy human reliance", "Legacy database structures"]
      },
      {
        name: "Project44",
        description: "Real-time visibility platform.",
        advantages: ["Industry standard APIs"],
        disadvantages: ["Reporting only", "No predictive corrective action"]
      }
    ]
  },
  compassLaunchGTM: {
    gtmStrategy: {
      overview: "Land and expand within top-tier medical and high-tech manufacturers.",
      keyChannels: ["Enterprise Direct Sales", "Strategic Partnerships with Port Authorities", "Technical Content Leadership"],
      initialLaunchPlan: "Pilot program with three Fortune 100 healthcare manufacturers to prove ROI in fragile cargo reduction."
    },
    pricingModel: {
      type: "Usage-based through-put fees",
      justification: "Aligns costs directly with client volume, making the software an operational necessity rather than a fixed overhead."
    },
    startupRoadmap: [
      { quarter: "Q3 2025", milestones: ["Secure Series A", "Launch Core Neural Router"] },
      { quarter: "Q4 2025", milestones: ["Expansion to EU Ports", "Predictive Weather Integration"] }
    ]
  },
  oracleInvestorAnalysis: {
    investorScoreAnalysis: "NexusFlow targets a massive, underserved problem with a modern technical moat. The usage-based pricing model is highly scalable, though execution risks in physical hardware integration remain.",
    investorVerdict: "Highly Investable"
  },
  architectPitchBuilder: {
    pitchDeckPreview: [
      { slideTitle: "The Problem", slideContent: "Logistics is broken. $400B is lost to predictive failure." },
      { slideTitle: "The Solution", slideContent: "NexusFlow: Autonomous correction for global cargo." },
      { slideTitle: "The Secret Sauce", slideContent: "Proprietary Graph-Neural Network mapping port congestion in real-time." }
    ]
  }
};

export const DEMO_ORACLE_SCORE: GenerateOracleInvestorScoreOutput = {
  score: 94,
  verdict: "A rare combination of massive TAM and technical moat. NexusFlow represents the next generation of industrial intelligence. The team has identified a critical friction point in global trade that legacy players are structurally incapable of solving.",
  marketRisks: ["Hardware integration delays", "Legacy regulatory hurdles"],
  strategicMoats: ["Proprietary Neural Router", "High switching costs"],
  designOpportunityInsights: ["Warmer editorial tones could differentiate from cold industrial competitors"],
  competitorMapping: [
    { name: "Flexport", threatLevel: "Medium", differentiationStrategy: "Predictive AI vs Human Operations" }
  ],
  viabilityMetrics: [
    { category: "Market Opportunity", score: 98 },
    { category: "Product Moat", score: 92 },
    { category: "Scalability", score: 95 }
  ]
};
