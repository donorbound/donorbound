"use client";

import Link from "next/link";

import { Icons } from "~/components/icons";
import { Section } from "~/components/section";
import { Button } from "~/components/ui/button";
import { Ripple } from "~/components/ui/ripple";

// const contributors = [
//   {
//     avatar:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
//     name: "Alice Johnson",
//   },
//   {
//     avatar:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
//     name: "Bob Brown",
//   },
//   {
//     avatar:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
//     name: "Charlie Davis",
//   },
//   {
//     avatar:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
//     name: "Diana Evans",
//   },
//   {
//     avatar:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
//     name: "Ethan Ford",
//   },
// ];

export function Community() {
  return (
    <Section id="community" title="Community">
      <div className="border-x border-t overflow-hidden relative">
        <Ripple />
        <div className="p-6 text-center py-12">
          <p className="text-muted-foreground mb-6 text-balance max-w-prose mx-auto font-medium">
            Built in the open. Powered by community. Making nonprofit tech
            better, together
          </p>
          {/* <div className="flex justify-center -space-x-6 mb-8">
            {contributors.map((contributor, index) => (
              <div key={index}>
                <Avatar className="size-12 relative border-2 border-background bg-muted">
                  <AvatarImage
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg font-semibold">
                    {contributor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div> */}
          <div className="flex justify-center space-x-4">
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              asChild
            >
              <Link href="/discord">
                <Icons.discord className="h-5 w-5" />
                Join our Community
              </Link>
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              asChild
            >
              <Link href="https://github.com/donorbound/donorbound">
                <Icons.github className="h-5 w-5" />
                Become a contributor
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
