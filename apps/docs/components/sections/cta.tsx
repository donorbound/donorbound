import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <Section id="cta">
      <div className="border overflow-hidden relative text-center py-16 mx-auto">
        <p className="max-w-3xl text-foreground mb-6 text-balance mx-auto font-medium text-3xl">
          Ready to build the future of nonprofit tech?
        </p>

        <div className="flex justify-center">
          <Button className="flex items-center gap-2">Join the waitlist</Button>
        </div>
      </div>
    </Section>
  );
}
