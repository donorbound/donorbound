"use client";

import { subscribe } from "@/app/actions/subscribe";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Input } from "../ui/input";

export function CTA() {
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await subscribe(formData);
    setMessage(result.message);
  }

  return (
    <Section id="cta">
      <div className="border overflow-hidden relative text-center py-16 mx-auto">
        <p className="max-w-3xl text-foreground mb-6 text-balance mx-auto font-medium text-3xl">
          Ready to build the future of nonprofit tech?
        </p>
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
    </Section>
  );
}
