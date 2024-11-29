import { IconBluesky } from "@/components/icons/bluesky";
import { IconGithub } from "@/components/icons/github";
import { IconInstagram } from "@/components/icons/instagram";
import { IconLinkedin } from "@/components/icons/linkedin";
import { IconX } from "@/components/icons/x";
import { HeartIcon } from "@radix-ui/react-icons";
import {
  BookOpenIcon,
  BrainIcon,
  CodeIcon,
  GlobeIcon,
  PlugIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "DonorBound",
  description: "Open Source Tools for Modern Nonprofits",
  cta: "Join the waitlist",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "Nonprofit Software",
    "Gift Aid Management",
    "Open Source",
    "Charity Technology",
  ],
  links: {
    email: "chris@donorbound.com",
    twitter: "https://x.com/donorbound",
    discord: "https://discord.gg/donorbound",
    github: "https://github.com/donorbound",
  },
  hero: {
    title: "DonorBound",
    description:
      "Modern, open-source tools that nonprofits actually need. Starting with Gift Aid management for UK charities, we're building independent, best-in-class solutions that solve real problems.",
    cta: "Join the waitlist",
    ctaDescription: "First product launching 2024",
  },
  features: [
    {
      name: "Gift Aid Management",
      description:
        "Process and track Gift Aid declarations with automated HMRC compliance checks.",
      icon: <HeartIcon className="h-6 w-6" />,
    },
    {
      name: "Multi-Organization Support",
      description:
        "Handle multiple organizations or branches under one account with isolated data.",
      icon: <GlobeIcon className="h-6 w-6" />,
    },
    {
      name: "Developer-First API",
      description:
        "RESTful APIs and webhooks that developers actually want to use.",
      icon: <CodeIcon className="h-6 w-6" />,
    },
    {
      name: "Open Source Foundation",
      description:
        "GPL-3.0 licensed, community driven, with full code transparency.",
      icon: <BookOpenIcon className="h-6 w-6" />,
    },
    {
      name: "Modern Architecture",
      description:
        "Built with TypeScript, REST APIs, webhooks, and Docker-ready deployment.",
      icon: <PlugIcon className="h-6 w-6" />,
    },
    {
      name: "Built for Scale",
      description:
        "Handle millions of donations with multi-region support and enterprise-grade security.",
      icon: <ZapIcon className="h-6 w-6" />,
    },
  ],
  pricing: [
    {
      name: "Self-Hosted",
      price: { monthly: "£0", yearly: "£0" },
      frequency: { monthly: "month", yearly: "year" },
      description: "Self-host the open source platform.",
      features: [
        "Full access to all open-source features",
        "Community support",
        "Self-hosted deployment",
        "Basic documentation",
      ],
      cta: "Join the waitlist",
    },
    {
      name: "Cloud",
      price: { monthly: "£199", yearly: "£1,990" },
      frequency: { monthly: "month", yearly: "year" },
      description: "Let us handle the hosting for you.",
      features: [
        "Managed cloud hosting",
        "Premium support",
        "Advanced monitoring",
        "API access",
        "Custom domain support",
        "Priority updates",
      ],
      cta: "Join the waitlist",
    },
    {
      name: "Enterprise",
      price: { monthly: "Custom", yearly: "Custom" },
      frequency: { monthly: "month", yearly: "year" },
      description: "Tailored solutions for large organizations.",
      features: [
        "Dedicated support",
        "Custom development",
        "On-premise deployment options",
        "SLA guarantees",
        "Priority feature development",
        "Direct access to engineering team",
      ],
      popular: true,
      cta: "Contact Sales",
    },
  ],
  footer: {
    socialLinks: [
      {
        icon: <IconX className="h-5 w-5" />,
        url: "https://x.com/donorbound",
      },
      {
        icon: <IconBluesky className="h-5 w-5" />,
        url: "https://bsky.app/profile/donorbound.coml",
      },
      {
        icon: <IconLinkedin className="h-5 w-5" />,
        url: "https://www.linkedin.com/company/donorbound",
      },
      {
        icon: <IconInstagram className="h-5 w-5" />,
        url: "https://www.instagram.com/donorbound",
      },
      {
        icon: <IconGithub className="h-5 w-5" />,
        url: "https://github.com/donorbound/donorbound",
      },
    ],
    links: [{ text: "Docs", url: "/docs" }],
    bottomText: "All rights reserved.",
    brandText: "Donorbound",
  },
  testimonials: [
    {
      id: 1,
      text: "The AI Agent SDK has revolutionized how we build intelligent systems. It's incredibly intuitive and powerful.",
      name: "Alice Johnson",
      company: "OpenMind Labs",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      text: "We've significantly reduced development time for our AI projects using this SDK. The multi-agent feature is a game-changer.",
      name: "Bob Brown",
      company: "NeuralForge",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 3,
      text: "The cross-language support allowed us to seamlessly integrate AI agents into our existing tech stack.",
      name: "Charlie Davis",
      company: "CodeHarbor",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 4,
      text: "The AI Agent SDK's tool integration feature has streamlined our workflow automation processes.",
      name: "Diana Evans",
      company: "AutomateX",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 5,
      text: "The customizable agent behaviors have allowed us to create highly specialized AI solutions for our clients.",
      name: "Ethan Ford",
      company: "AICore",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 6,
      text: "The AI Agent SDK's efficiency features have significantly improved our system's performance and scalability.",
      name: "Fiona Grant",
      company: "ScaleAI",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 7,
      text: "The SDK's intuitive APIs have made it easy for our team to quickly prototype and deploy AI agent systems.",
      name: "George Harris",
      company: "RapidAI",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 8,
      text: "The AI Agent SDK's multi-agent system has enabled us to build complex, collaborative AI solutions with ease.",
      name: "Hannah Irving",
      company: "CollabAI",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 9,
      text: "The SDK's flexibility in integrating external tools has expanded our AI agents' capabilities tremendously.",
      name: "Ian Johnson",
      company: "FlexAI",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 10,
      text: "The AI Agent SDK's documentation and support have made our learning curve much smoother.",
      name: "Julia Kim",
      company: "DevAI",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 11,
      text: "We've seen a significant boost in our AI's decision-making capabilities thanks to the AI Agent SDK.",
      name: "Kevin Lee",
      company: "DecisionTech",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 12,
      text: "The SDK's multi-agent system has revolutionized our approach to complex problem-solving.",
      name: "Laura Martinez",
      company: "SolveX",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 13,
      text: "The customization options in the AI Agent SDK have allowed us to create truly unique AI solutions.",
      name: "Michael Chen",
      company: "UniqueAI",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 14,
      text: "The efficiency of the AI Agent SDK has significantly reduced our development time and costs.",
      name: "Natalie Wong",
      company: "FastTrackAI",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 15,
      text: "The cross-language support has made it easy for our diverse team to collaborate on AI projects.",
      name: "Oliver Smith",
      company: "GlobalAI",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
