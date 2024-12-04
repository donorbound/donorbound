import { type CSSProperties, memo } from "react";

import { cn } from "~/lib/utils";

interface RippleProperties {
  className?: string;
  numCircles?: number;
  mainCircleSize?: number;
  mainCircleOpacity?: number;
}

export const Ripple = memo(function Ripple({
  className,
  mainCircleOpacity = 0.24,
  mainCircleSize = 210,
  numCircles: numberCircles = 8,
}: RippleProperties) {
  return (
    <div
      className={cn(
        "pointer-events-none select-none absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className,
      )}
    >
      {Array.from({ length: numberCircles }, (_, index) => {
        const size = mainCircleSize + index * 70;
        const opacity = mainCircleOpacity - index * 0.03;
        const animationDelay = `${index * 0.06}s`;
        const borderStyle = index === numberCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + index * 5;

        return (
          <div
            key={`ripple-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            className={`absolute animate-ripple rounded-full bg-foreground/25 shadow-xl border [--i:${index}]`}
            style={
              {
                animationDelay,
                borderColor: `hsl(var(--foreground), ${borderOpacity / 100})`,
                borderStyle,
                borderWidth: "1px",
                height: `${size}px`,
                left: "50%",
                opacity,
                top: "50%",
                transform: "translate(-50%, -50%) scale(1)",
                width: `${size}px`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";
