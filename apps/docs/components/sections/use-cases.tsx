"use client";

import { cubicBezier, motion } from "framer-motion";
import {
  CoinsIcon,
  FileTextIcon,
  GiftIcon,
  HandHelpingIcon,
  HeartIcon,
  LandmarkIcon,
  MailIcon,
  PoundSterlingIcon,
  ReceiptIcon,
  UserCheckIcon,
} from "lucide-react";

import { Section } from "~/components/section";
import OrbitingCircles from "~/components/ui/orbiting-circles";

const containerVariants = {
  initial: {},
  whileHover: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function Card1() {
  const variant1 = {
    initial: {
      scale: 0.87,
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "linear",
      },
    },
    whileHover: {
      boxShadow:
        "rgba(245,40,145,0.35) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      scale: 0.8,
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "linear",
      },
    },
  };
  const variant2 = {
    initial: {
      scale: 0.95,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: "linear",
      },
      y: -27,
    },
    whileHover: {
      boxShadow:
        "rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      scale: 0.87,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: "linear",
      },
      y: -55,
    },
  };
  const variant3 = {
    initial: {
      opacity: 0,
      scale: 1,
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "linear",
      },
      y: -25,
    },
    whileHover: {
      boxShadow:
        "rgba(39,245,76,0.15) 10px 20px 70px -20px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "easeInOut",
      },
      y: -45,
    },
  };

  return (
    <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 lg:border-r">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileHover="whileHover"
        className="flex flex-col gap-y-5 items-center justify-between h-full w-full cursor-pointer"
      >
        <div className="flex h-full w-full items-center justify-center rounded-t-xl border-b">
          <div className="relative flex flex-col items-center justify-center gap-y-2 p-10">
            <motion.div
              variants={variant1}
              className="z-[1] flex h-full w-full items-center justify-between gap-x-2 rounded-md border bg-background p-5 px-2.5"
            >
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                <GiftIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80" />
                <div className="h-2 w-48 rounded-full bg-slate-400/50" />
                <div className="text-xs text-neutral-500">
                  Gift Aid Declaration Captured
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={variant2}
              className="z-[2] flex h-full w-full items-center justify-between gap-x-2 rounded-md border bg-background p-5 px-2.5"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <ReceiptIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80" />
                <div className="h-2 w-48 rounded-full bg-slate-400/50" />
                <div className="text-xs text-neutral-500">
                  HMRC Compliance Check Passed
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={variant3}
              className="absolute bottom-0 z-[3] m-auto flex h-fit w-fit items-center justify-between gap-x-2 rounded-md border bg-background p-5 px-2.5"
            >
              <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                <PoundSterlingIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80" />
                <div className="h-2 w-48 rounded-full bg-slate-400/50" />
                <div className="text-xs text-neutral-500">
                  Gift Aid Claim Ready for Submission
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
          <h2 className="font-semibold tracking-tight text-lg">
            Automated Gift Aid
          </h2>
          <p className="text-sm text-muted-foreground">
            Streamline Gift Aid processing from declaration to HMRC submission.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

const Card2 = () => {
  const logs = [
    {
      icon: (
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
          <UserCheckIcon className="h-5 w-5 text-white" />
        </div>
      ),
      id: 1,
      message: "New donor declaration received",
      timestamp: "14:23:45",
      type: "info",
    },
    {
      icon: (
        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
          <CoinsIcon className="h-5 w-5 text-white" />
        </div>
      ),
      id: 2,
      message: "Processing £100 donation...",
      timestamp: "14:23:47",
      type: "action",
    },
    {
      icon: (
        <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
          <GiftIcon className="h-5 w-5 text-white" />
        </div>
      ),
      id: 3,
      message: "Gift Aid calculated: £25.00",
      timestamp: "14:23:50",
      type: "success",
    },
    {
      icon: (
        <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center">
          <MailIcon className="h-5 w-5 text-white" />
        </div>
      ),
      id: 4,
      message: "Thank you email sent to donor",
      timestamp: "14:23:52",
      type: "email",
    },
    {
      icon: (
        <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
          <LandmarkIcon className="h-5 w-5 text-white" />
        </div>
      ),
      id: 5,
      message: "Transaction recorded for HMRC claim",
      timestamp: "14:23:55",
      type: "complete",
    },
  ];
  return (
    <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 lg:border-r">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileHover="whileHover"
        className="flex flex-col gap-y-5 items-center justify-between h-full w-full cursor-pointer"
      >
        <div className="border-b items-center justify-center overflow-hidden bg-transparent rounded-t-xl h-4/5 w-full flex">
          <motion.div className="p-5 rounded-t-md cursor-pointer overflow-hidden h-[270px] flex flex-col gap-y-3.5 w-full">
            {logs.map((log, index) => (
              <motion.div
                key={log.id}
                className="p-4 bg-transparent backdrop-blur-md shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] border border-border origin-right w-full rounded-md flex items-center"
                custom={index}
                variants={{
                  initial: (index: number) => ({
                    opacity: 1,
                    scale: index === 4 ? 0.9 : 1,
                    transition: {
                      delay: 0.05,
                      duration: 0.2,
                      ease: cubicBezier(0.22, 1, 0.36, 1),
                    },
                    y: 0,
                  }),
                  whileHover: (index: number) => ({
                    opacity: index === 4 ? 1 : 0.6,
                    scale: index === 0 ? 0.85 : index === 4 ? 1.1 : 1,
                    transition: {
                      delay: 0.05,
                      duration: 0.2,
                      ease: cubicBezier(0.22, 1, 0.36, 1),
                    },
                    y: -85,
                  }),
                }}
              >
                <div className="mr-3">{log.icon}</div>
                <div className="flex-grow">
                  <p className="text-foreground text-xs font-medium">
                    [{log.timestamp}] {log.type.toUpperCase()}
                  </p>
                  <p className="text-muted-foreground text-xs">{log.message}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
          <h2 className="font-semibold tracking-tight text-lg">
            Real-time Processing
          </h2>
          <p className="text-sm text-muted-foreground">
            Track donations and Gift Aid processing in real-time with detailed
            logs.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const Card3 = () => {
  return (
    <div className="p-0 min-h-[500px] lg:min-h-fit overflow-hidden border-b lg:border-b-0 -z-0">
      <div className="relative flex flex-col gap-y-5 items-center justify-between h-full w-full">
        <div className="border-b items-center justify-center overflow-hidden rounded-t-xl h-4/5 w-full flex">
          <div className="relative flex items-center justify-center h-full w-full">
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle,hsl(var(--accent)/0.3)_0%,transparent_100%)]" />
            <OrbitingCircles duration={15} delay={0} radius={40} reverse>
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <HeartIcon className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
            <OrbitingCircles duration={15} delay={20} radius={80}>
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                <HandHelpingIcon className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
            <OrbitingCircles radius={120} duration={20} delay={20}>
              <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                <FileTextIcon className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
            <OrbitingCircles radius={160} duration={40} delay={20}>
              <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center">
                <MailIcon className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
            <OrbitingCircles radius={200} duration={30}>
              <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                <ReceiptIcon className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
          </div>
        </div>
        <div className="flex flex-col gap-y-1 px-5 pb-4 items-start w-full">
          <h2 className="font-semibold tracking-tight text-lg">
            Complete Toolkit
          </h2>
          <p className="text-sm text-muted-foreground">
            Everything you need to manage donations and Gift Aid in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export function UseCases() {
  return (
    <Section id="use-cases" title="Use Cases">
      <div className="grid lg:grid-cols-3 h-full border border-b-0">
        <Card1 />
        <Card2 />
        <Card3 />
      </div>
    </Section>
  );
}
