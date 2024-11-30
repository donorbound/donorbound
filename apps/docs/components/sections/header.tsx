"use client";

import { subscribe } from "@/app/actions/subscribe";
import { Icons } from "@/components/icons";
import { MobileDrawer } from "@/components/mobile-drawer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { useState } from "react";

import { Input } from "../ui/input";

export function Header() {
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await subscribe(formData);
    setMessage(result.message);
  }

  return (
    <header className="sticky top-0 h-[var(--header-height)] z-50 p-0 bg-background/60 backdrop-blur">
      <div className="flex justify-between items-center container mx-auto p-2">
        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2"
        >
          <Icons.logo className="w-auto" />
          <span className="font-semibold text-lg">{siteConfig.name}</span>
        </Link>
        <div className="hidden lg:block">
          <form
            action={handleSubmit}
            className="flex flex-col items-center gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full"
            />
            <Button type="submit" className="flex items-center gap-2">
              Join the waitlist
            </Button>
            {message && (
              <p className="text-sm text-muted-foreground">{message}</p>
            )}
          </form>
        </div>
        <div className="mt-2 cursor-pointer block lg:hidden">
          <MobileDrawer />
        </div>
      </div>
      <hr className="absolute w-full bottom-0" />
    </header>
  );
}
