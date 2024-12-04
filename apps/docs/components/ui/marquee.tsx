import { cn } from "~/lib/utils";

interface MarqueeProperties {
  repeat?: number;
  reverse?: boolean;
  className?: string;
  vertical?: boolean;
  [key: string]: unknown;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
}

export default function Marquee({
  children,
  className,
  pauseOnHover = false,
  repeat = 4,
  reverse,
  vertical = false,
  ...properties
}: MarqueeProperties) {
  return (
    <div
      {...properties}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-col": vertical,
          "flex-row": !vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, index) => (
          <div
            key={`marquee-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "[animation-direction:reverse]": reverse,
              "animate-marquee-vertical flex-col": vertical,
              "animate-marquee flex-row": !vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
