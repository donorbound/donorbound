import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";

interface MarketingLayoutProperties {
  children: React.ReactNode;
}

export default async function Layout({ children }: MarketingLayoutProperties) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
