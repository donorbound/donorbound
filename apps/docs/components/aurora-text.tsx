"use client";

import type React from "react";

import { cn } from "@/lib/utils";

export function AuroraText({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "relative overflow-hidden inline-flex bg-background",
        className,
      )}
    >
      {children}
      <div className="aurora absolute inset-0 pointer-events-none mix-blend-lighten dark:mix-blend-darken">
        {[...Array(5)].map((_, index) => (
          <div
            key={`aurora-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            className="aurora__item absolute w-[60vw] h-[60vw]"
            style={{
              animation: `aurora-border 6s ease-in-out infinite, aurora-${
                index + 1
              } 12s ease-in-out infinite alternate`,
              backgroundColor: `hsl(var(--color-${index + 1}))`,
              filter: "blur(1rem)",
              mixBlendMode: "overlay",
              ...getInitialPosition(index),
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes aurora-border {
          0%,
          100% {
            border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
          }
          25% {
            border-radius: 47% 29% 39% 49% / 61% 19% 66% 26%;
          }
          50% {
            border-radius: 57% 23% 47% 72% / 63% 17% 66% 33%;
          }
          75% {
            border-radius: 28% 49% 29% 100% / 93% 20% 64% 25%;
          }
        }
        @keyframes aurora-1 {
          0%,
          100% {
            top: 0;
            right: 0;
          }
          50% {
            top: 50%;
            right: 25%;
          }
          75% {
            top: 25%;
            right: 50%;
          }
        }
        @keyframes aurora-2 {
          0%,
          100% {
            top: 0;
            left: 0;
          }
          60% {
            top: 75%;
            left: 25%;
          }
          85% {
            top: 50%;
            left: 50%;
          }
        }
        @keyframes aurora-3 {
          0%,
          100% {
            bottom: 0;
            left: 0;
          }
          40% {
            bottom: 50%;
            left: 25%;
          }
          65% {
            bottom: 25%;
            left: 50%;
          }
        }
        @keyframes aurora-4 {
          0%,
          100% {
            bottom: 0;
            right: 0;
          }
          50% {
            bottom: 25%;
            right: 40%;
          }
          90% {
            bottom: 50%;
            right: 25%;
          }
        }
      `}</style>
    </span>
  );
}

function getInitialPosition(index: number): React.CSSProperties {
  const positions = [
    { top: "-50%" },
    { right: 0, top: 0 },
    { bottom: 0, left: 0 },
    { bottom: "-50%", right: 0 },
  ];
  return positions[index] || {};
}
