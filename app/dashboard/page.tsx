import Link from "next/link";

const portfolio = [
  { symbol: "BTC", name: "Bitcoin", amount: "0.4821", value: "$32,501", change: "+2.4%", positive: true },
  { symbol: "ETH", name: "Ethereum", amount: "5.12", value: "$19,517", change: "+1.8%", positive: true },
  { symbol: "SOL", name: "Solana", amount: "42.3", value: "$7,529", change: "-0.6%", positive: false },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0e1a", color: "#e2e8f0" }}>
      {/* Navbar */}
      <nav
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            ₿
          </div>
          <span className="text-xl font-bold gradient-text">CryptoNex</span>
        </div>
        <Link
          href="/"
          className="text-sm px-4 py-2 rounded-lg transition-all hover:text-white"
          style={{ color: "rgba(226,232,240,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          Sign Out
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-1">Welcome back! 👋</h1>
          <p style={{ color: "rgba(226,232,240,0.5)" }}>Here&apos;s your portfolio overview</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            { label: "Total Balance", value: "$59,547", sub: "+$1,204 today" },
            { label: "24h P&L", value: "+$1,204", sub: "+2.1% today", green: true },
            { label: "Open Positions", value: "3", sub: "Active trades" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-sm mb-2" style={{ color: "rgba(226,232,240,0.5)" }}>{stat.label}</p>
              <p
                className="text-3xl font-bold mb-1"
                style={{ color: stat.green ? "#34d399" : "white" }}
              >
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: "rgba(226,232,240,0.4)" }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Portfolio */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 className="text-lg font-bold text-white">Your Holdings</h2>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {portfolio.map((coin) => (
              <div key={coin.symbol} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                    style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}
                  >
                    {coin.symbol[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{coin.symbol}</p>
                    <p className="text-xs" style={{ color: "rgba(226,232,240,0.4)" }}>{coin.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">{coin.value}</p>
                  <p className="text-xs" style={{ color: coin.positive ? "#34d399" : "#f87171" }}>{coin.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center mt-10 text-sm" style={{ color: "rgba(226,232,240,0.3)" }}>
          This is a demo dashboard. Connect your wallet to see real data.
        </p>
      </div>
    </div>
  );
}
