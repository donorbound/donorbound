import { HeartIcon } from "@radix-ui/react-icons";
import {
  BookOpenIcon,
  CodeIcon,
  GlobeIcon,
  PlugIcon,
  ZapIcon,
} from "lucide-react";

import { Icons } from "~/components/icons";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  cta: "Join the waitlist",
  description: "Open Source Tools for Modern Nonprofits",
  features: [
    {
      description:
        "Process and track Gift Aid declarations with automated HMRC compliance checks.",
      icon: <HeartIcon className="h-6 w-6" />,
      name: "Gift Aid Management",
    },
    {
      description:
        "Handle multiple organizations or branches under one account with isolated data.",
      icon: <GlobeIcon className="h-6 w-6" />,
      name: "Multi-Organization Support",
    },
    {
      description:
        "RESTful APIs and webhooks that developers actually want to use.",
      icon: <CodeIcon className="h-6 w-6" />,
      name: "Developer-First API",
    },
    {
      description:
        "GPL-3.0 licensed, community driven, with full code transparency.",
      icon: <BookOpenIcon className="h-6 w-6" />,
      name: "Open Source Foundation",
    },
    {
      description:
        "Built with TypeScript, REST APIs, webhooks, and Docker-ready deployment.",
      icon: <PlugIcon className="h-6 w-6" />,
      name: "Modern Architecture",
    },
    {
      description:
        "Handle millions of donations with multi-region support and enterprise-grade security.",
      icon: <ZapIcon className="h-6 w-6" />,
      name: "Built for Scale",
    },
  ],
  footer: {
    bottomText: "All rights reserved.",
    brandText: "Donorbound",
    links: [
      { text: "Blog", url: "/blog" },
      { text: "Docs", url: "/docs" },
    ],
    socialLinks: [
      {
        icon: <Icons.x className="h-5 w-5" />,
        url: "https://x.com/donorbound",
      },
      {
        icon: <Icons.bluesky className="h-5 w-5" />,
        url: "https://bsky.app/profile/donorbound.coml",
      },
      {
        icon: <Icons.discord className="h-5 w-5" />,
        url: "https://donorbound.com/donorbound",
      },
      {
        icon: <Icons.linkedin className="h-5 w-5" />,
        url: "https://www.linkedin.com/company/donorbound",
      },
      {
        icon: <Icons.instagram className="h-5 w-5" />,
        url: "https://www.instagram.com/donorbound",
      },
      {
        icon: <Icons.github className="h-5 w-5" />,
        url: "https://github.com/donorbound/donorbound",
      },
    ],
  },
  hero: {
    cta: "Join the waitlist",
    ctaDescription: "First product launching 2024",
    description:
      "Modern, open-source tools that nonprofits actually need. Starting with Gift Aid management for UK charities, we're building independent, best-in-class solutions that solve real problems.",
    title: "Donorbound",
  },
  keywords: [
    "Nonprofit Software",
    "Gift Aid Management",
    "Open Source",
    "Charity Technology",
  ],
  links: {
    discord: "https://discord.gg/donorbound",
    email: "chris@donorbound.com",
    github: "https://github.com/donorbound",
    twitter: "https://x.com/donorbound",
  },
  name: "Donorbound",
  pricing: [
    {
      cta: "Join the waitlist",
      description: "Self-host the open source platform.",
      features: [
        "Full access to all open-source features",
        "Community support",
        "Self-hosted deployment",
        "Basic documentation",
      ],
      frequency: { monthly: "month", yearly: "year" },
      name: "Self-Hosted",
      price: { monthly: "£0", yearly: "£0" },
    },
    {
      cta: "Join the waitlist",
      description: "Let us handle the hosting for you.",
      features: [
        "Managed cloud hosting",
        "Premium support",
        "Advanced monitoring",
        "API access",
        "Custom domain support",
        "Priority updates",
      ],
      frequency: { monthly: "month", yearly: "year" },
      name: "Cloud",
      price: { monthly: "£199", yearly: "£1,990" },
    },
    {
      cta: "Contact Sales",
      description: "Tailored solutions for large organizations.",
      features: [
        "Dedicated support",
        "Custom development",
        "On-premise deployment options",
        "SLA guarantees",
        "Priority feature development",
        "Direct access to engineering team",
      ],
      frequency: { monthly: "month", yearly: "year" },
      name: "Enterprise",
      popular: true,
      price: { monthly: "Custom", yearly: "Custom" },
    },
  ],
  testimonials: [
    {
      company: "OpenMind Labs",
      id: 1,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
      name: "Alice Johnson",
      text: "The AI Agent SDK has revolutionized how we build intelligent systems. It's incredibly intuitive and powerful.",
    },
    {
      company: "NeuralForge",
      id: 2,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      name: "Bob Brown",
      text: "We've significantly reduced development time for our AI projects using this SDK. The multi-agent feature is a game-changer.",
    },
    {
      company: "CodeHarbor",
      id: 3,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      name: "Charlie Davis",
      text: "The cross-language support allowed us to seamlessly integrate AI agents into our existing tech stack.",
    },
    {
      company: "AutomateX",
      id: 4,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      name: "Diana Evans",
      text: "The AI Agent SDK's tool integration feature has streamlined our workflow automation processes.",
    },
    {
      company: "AICore",
      id: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      name: "Ethan Ford",
      text: "The customizable agent behaviors have allowed us to create highly specialized AI solutions for our clients.",
    },
    {
      company: "ScaleAI",
      id: 6,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      name: "Fiona Grant",
      text: "The AI Agent SDK's efficiency features have significantly improved our system's performance and scalability.",
    },
    {
      company: "RapidAI",
      id: 7,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      name: "George Harris",
      text: "The SDK's intuitive APIs have made it easy for our team to quickly prototype and deploy AI agent systems.",
    },
    {
      company: "CollabAI",
      id: 8,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      name: "Hannah Irving",
      text: "The AI Agent SDK's multi-agent system has enabled us to build complex, collaborative AI solutions with ease.",
    },
    {
      company: "FlexAI",
      id: 9,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      name: "Ian Johnson",
      text: "The SDK's flexibility in integrating external tools has expanded our AI agents' capabilities tremendously.",
    },
    {
      company: "DevAI",
      id: 10,
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      name: "Julia Kim",
      text: "The AI Agent SDK's documentation and support have made our learning curve much smoother.",
    },
    {
      company: "DecisionTech",
      id: 11,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      name: "Kevin Lee",
      text: "We've seen a significant boost in our AI's decision-making capabilities thanks to the AI Agent SDK.",
    },
    {
      company: "SolveX",
      id: 12,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      name: "Laura Martinez",
      text: "The SDK's multi-agent system has revolutionized our approach to complex problem-solving.",
    },
    {
      company: "UniqueAI",
      id: 13,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      name: "Michael Chen",
      text: "The customization options in the AI Agent SDK have allowed us to create truly unique AI solutions.",
    },
    {
      company: "FastTrackAI",
      id: 14,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      name: "Natalie Wong",
      text: "The efficiency of the AI Agent SDK has significantly reduced our development time and costs.",
    },
    {
      company: "GlobalAI",
      id: 15,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
      name: "Oliver Smith",
      text: "The cross-language support has made it easy for our diverse team to collaborate on AI projects.",
    },
  ],
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

export type SiteConfig = typeof siteConfig;
