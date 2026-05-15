"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function AuthContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">(
    searchParams.get("mode") === "signup" ? "signup" : "signin"
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const switchMode = (m: "signin" | "signup") => {
    setMode(m);
    setErrors({});
    setSuccess(false);
    setForm({ name: "", email: "", password: "", confirm: "" });
    router.replace(`/auth${m === "signup" ? "?mode=signup" : ""}`, { scroll: false });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === "signup" && !form.name.trim()) e.name = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (mode === "signup" && form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => router.push("/dashboard"), 1500);
  };

  return (
    <>
      {/* Tabs */}
      <div className="flex rounded-xl p-1 mb-8" style={{ background: "rgba(255,255,255,0.04)" }}>
        {(["signin", "signup"] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: mode === m ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
              color: mode === m ? "white" : "rgba(226,232,240,0.5)",
            }}
          >
            {m === "signin" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h2>
        <p className="text-sm" style={{ color: "rgba(226,232,240,0.5)" }}>
          {mode === "signup"
            ? "Start trading in minutes — no credit card required"
            : "Sign in to access your portfolio"}
        </p>
      </div>

      {success ? (
        <div className="text-center py-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"
            style={{ background: "rgba(52,211,153,0.15)", border: "2px solid rgba(52,211,153,0.4)" }}
          >
            ✓
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {mode === "signup" ? "Account Created!" : "Welcome Back!"}
          </h3>
          <p style={{ color: "rgba(226,232,240,0.6)" }}>Redirecting to your dashboard...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "rgba(226,232,240,0.7)" }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-dark w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.name && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "rgba(226,232,240,0.7)" }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-dark w-full px-4 py-3 rounded-xl text-sm"
            />
            {errors.email && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "rgba(226,232,240,0.7)" }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={mode === "signup" ? "Min. 8 characters" : "Your password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-dark w-full px-4 py-3 rounded-xl text-sm pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lg transition-opacity hover:opacity-70"
                style={{ color: "rgba(226,232,240,0.4)" }}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
            {errors.password && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.password}</p>}
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "rgba(226,232,240,0.7)" }}>
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className="input-dark w-full px-4 py-3 rounded-xl text-sm"
              />
              {errors.confirm && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.confirm}</p>}
            </div>
          )}

          {mode === "signin" && (
            <div className="flex justify-end">
              <button type="button" className="text-sm hover:underline" style={{ color: "#a5b4fc" }}>
                Forgot password?
              </button>
            </div>
          )}

          {mode === "signup" && (
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                className="mt-0.5 w-4 h-4 rounded"
                style={{ accentColor: "#6366f1" }}
              />
              <span className="text-xs leading-relaxed" style={{ color: "rgba(226,232,240,0.5)" }}>
                I agree to the{" "}
                <span className="underline cursor-pointer" style={{ color: "#a5b4fc" }}>Terms of Service</span>{" "}
                and{" "}
                <span className="underline cursor-pointer" style={{ color: "#a5b4fc" }}>Privacy Policy</span>
              </span>
            </label>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {mode === "signup" ? "Creating Account..." : "Signing In..."}
              </span>
            ) : mode === "signup" ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 text-xs" style={{ background: "#111827", color: "rgba(226,232,240,0.4)" }}>
                or continue with
              </span>
            </div>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Google", icon: "🌐" },
              { label: "Apple", icon: "🍎" },
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#e2e8f0",
                }}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          {/* Switch mode */}
          <p className="text-center mt-2 text-sm" style={{ color: "rgba(226,232,240,0.4)" }}>
            {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
              className="font-medium hover:underline"
              style={{ color: "#a5b4fc" }}
            >
              {mode === "signin" ? "Sign up free" : "Sign in"}
            </button>
          </p>
        </form>
      )}
    </>
  );
}

export default function AuthPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative"
      style={{ background: "#0a0e1a" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Stars */}
      {mounted &&
        Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 3 + "s",
            }}
          />
        ))}

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              ₿
            </div>
            <span className="text-2xl font-bold gradient-text">CryptoNex</span>
          </Link>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(17, 24, 39, 0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Suspense
            fallback={
              <div className="text-center py-8" style={{ color: "rgba(226,232,240,0.4)" }}>
                Loading...
              </div>
            }
          >
            <AuthContent />
          </Suspense>
        </div>

        <p className="text-center mt-6 text-sm" style={{ color: "rgba(226,232,240,0.3)" }}>
          <Link href="/" className="hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
