import { Footer } from "~/components/sections/footer";

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
