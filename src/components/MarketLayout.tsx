import { ReactNode } from "react";
import MarketHeader from "./MarketHeader";
import MarketFooter from "./MarketFooter";

interface MarketLayoutProps {
  children: ReactNode;
}

const MarketLayout = ({ children }: MarketLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MarketHeader />
      <main className="flex-1">{children}</main>
      <MarketFooter />
    </div>
  );
};

export default MarketLayout;
