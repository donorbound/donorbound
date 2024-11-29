import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: MarketingLayoutProps) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
