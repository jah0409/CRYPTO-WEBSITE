"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const cryptoStats = [
  { name: "Bitcoin", symbol: "BTC", price: "$67,420", change: "+2.4%", positive: true },
  { name: "Ethereum", symbol: "ETH", price: "$3,812", change: "+1.8%", positive: true },
  { name: "Solana", symbol: "SOL", price: "$178", change: "-0.6%", positive: false },
  { name: "BNB", symbol: "BNB", price: "$612", change: "+3.1%", positive: true },
];

const features = [
  {
    icon: "🔒",
    title: "Bank-Grade Security",
    desc: "Military-grade encryption and multi-factor authentication protect every transaction.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "Execute trades in milliseconds with our high-performance matching engine.",
  },
  {
    icon: "📊",
    title: "Advanced Analytics",
    desc: "Real-time charts, portfolio tracking, and AI-powered market insights.",
  },
  {
    icon: "🌐",
    title: "200+ Assets",
    desc: "Trade Bitcoin, Ethereum, and 200+ other cryptocurrencies in one place.",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#0a0e1a", color: "#e2e8f0" }}>
      {/* Stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.6 + 0.1,
              animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 3 + "s",
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10, 14, 26, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              ₿
            </div>
            <span className="text-xl font-bold gradient-text">CryptoNex</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "rgba(226,232,240,0.7)" }}>
            <a href="#markets" className="hover:text-white transition-colors">Markets</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth"
              className="text-sm px-4 py-2 rounded-lg transition-all hover:text-white"
              style={{ color: "rgba(226,232,240,0.7)" }}
            >
              Sign In
            </Link>
            <Link
              href="/auth?mode=signup"
              className="text-sm px-5 py-2 rounded-lg font-medium transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white" }}
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Glow orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8"
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#a5b4fc",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" style={{ animation: "pulse 2s infinite" }} />
            Live trading — 2.4M+ users worldwide
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Trade Crypto{" "}
            <span className="gradient-text">Smarter</span>
            <br />
            Not Harder
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: "rgba(226,232,240,0.6)" }}>
            The most advanced crypto trading platform. Real-time data, institutional-grade
            security, and AI-powered insights — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth?mode=signup"
              className="glow-button px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "white",
                boxShadow: "0 0 30px rgba(99,102,241,0.4)",
              }}
            >
              🚀 Launch App — It&apos;s Free
            </Link>
            <Link
              href="/auth"
              className="px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e2e8f0",
              }}
            >
              Sign In
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm" style={{ color: "rgba(226,232,240,0.4)" }}>
            <span>✓ No credit card required</span>
            <span>✓ Free tier available</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Live Markets Ticker */}
      <section id="markets" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            <span className="gradient-text">Live Markets</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cryptoStats.map((coin) => (
              <div
                key={coin.symbol}
                className="card-glass rounded-2xl p-5 transition-all hover:scale-105 cursor-pointer"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-white">{coin.symbol}</p>
                    <p className="text-xs" style={{ color: "rgba(226,232,240,0.4)" }}>{coin.name}</p>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}
                  >
                    {coin.symbol[0]}
                  </div>
                </div>
                <p className="text-xl font-bold text-white">{coin.price}</p>
                <p
                  className="text-sm font-medium mt-1"
                  style={{ color: coin.positive ? "#34d399" : "#f87171" }}
                >
                  {coin.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-center mb-14" style={{ color: "rgba(226,232,240,0.5)" }}>
            Professional tools, simplified for everyone
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(226,232,240,0.5)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div
          className="max-w-3xl mx-auto rounded-3xl p-12 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))",
            border: "1px solid rgba(99,102,241,0.3)",
          }}
        >
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Ready to Start Trading?
          </h2>
          <p className="mb-8" style={{ color: "rgba(226,232,240,0.6)" }}>
            Join 2.4 million traders already using CryptoNex.
          </p>
          <Link
            href="/auth?mode=signup"
            className="inline-block px-10 py-4 rounded-xl text-lg font-semibold hover:opacity-90 hover:scale-105 transition-all"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white" }}
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(226,232,240,0.3)" }}>
        <p className="text-sm">© 2026 CryptoNex. All rights reserved.</p>
      </footer>
    </div>
  );
}
