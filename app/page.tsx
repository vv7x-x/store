"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NovelsGrid from "@/components/NovelsGrid";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";

// Dynamic import for canvas to avoid SSR issues
const StarField = dynamic(() => import("@/components/StarField"), { ssr: false });

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--midnight)" }}
    >
      {/* Animated star field canvas */}
      <StarField />

      {/* Top deep vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: `
            radial-gradient(ellipse 120% 50% at 50% -10%, rgba(76,29,149,0.18) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Content layers */}
      <div className="relative z-10">
        <Navbar />

        <main>
          <HeroSection onSearch={setSearchQuery} />
          <QuoteSection />
          <NovelsGrid searchQuery={searchQuery} />
        </main>

        <Footer />
      </div>
    </div>
  );
}
