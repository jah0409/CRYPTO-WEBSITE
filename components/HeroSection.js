const { motion: heroMotion, useReducedMotion: heroUseReducedMotion } = Motion;

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4';

function HeroArrowUpRight({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function HeroPlayIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" />
    </svg>
  );
}

function FadeIn({ children, delay, className }) {
  const prefersReduced = heroUseReducedMotion();
  return (
    <heroMotion.div
      className={className}
      initial={prefersReduced ? { opacity: 0 } : { filter: 'blur(10px)', opacity: 0, y: 20 }}
      animate={prefersReduced ? { opacity: 1 } : { filter: 'blur(0px)', opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: delay || 0 }}
    >
      {children}
    </heroMotion.div>
  );
}

function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background video — 120% wide/tall, top-anchored */}
      <FadingVideo
        src={HERO_VIDEO}
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
        style={{ width: '120%', height: '120%' }}
      />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col h-full">
        <Navbar />

        {/* Main centred content */}
        <div className="flex-1 flex flex-col items-center justify-center pt-24 px-4 text-center">

          {/* Badge */}
          <FadeIn delay={0.4} className="flex items-center">
            <div className="liquid-glass rounded-full flex items-center gap-2 px-1.5 py-1.5">
              <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold font-body leading-none">New</span>
              <span className="text-sm text-white/90 font-body pr-3">Maiden Crewed Voyage to Mars Arrives 2026</span>
            </div>
          </FadeIn>

          {/* Headline */}
          <div className="mt-6">
            <BlurText
              text="Venture Past Our Sky Across the Universe"
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl tracking-[-4px]"
            />
          </div>

          {/* Subheading */}
          <FadeIn delay={0.8} className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight">
            Discover the universe in ways once unimaginable. Our pioneering vessels and breakthrough engineering bring deep-space exploration within reach—secure and extraordinary.
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={1.1} className="flex items-center gap-6 mt-6">
            <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white font-body flex items-center gap-2">
              Start Your Voyage
              <HeroArrowUpRight className="h-5 w-5" />
            </button>
            <button className="flex items-center gap-2 text-white text-sm font-medium font-body">
              View Liftoff
              <HeroPlayIcon className="h-4 w-4" />
            </button>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={1.3} className="flex items-stretch gap-4 mt-8">
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col">
              <ClockIcon />
              <div className="flex-1" />
              <div className="mt-4">
                <p className="font-heading italic text-white text-4xl tracking-[-1px] leading-none">34.5 Min</p>
                <p className="text-xs text-white font-body font-light mt-2">Average Videos Watch Time</p>
              </div>
            </div>
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col">
              <GlobeIcon />
              <div className="flex-1" />
              <div className="mt-4">
                <p className="font-heading italic text-white text-4xl tracking-[-1px] leading-none">2.8B+</p>
                <p className="text-xs text-white font-body font-light mt-2">Users Across the Globe</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Partners strip */}
        <FadeIn delay={1.4} className="flex flex-col items-center gap-4 pb-8">
          <div className="liquid-glass rounded-full px-3.5 py-1">
            <span className="text-xs font-medium text-white font-body">Collaborating with top aerospace pioneers globally</span>
          </div>
          <div className="flex items-center gap-12 md:gap-16">
            {['Aeon', 'Vela', 'Apex', 'Orbit', 'Zeno'].map((name) => (
              <span key={name} className="font-heading italic text-white text-2xl md:text-3xl tracking-tight">
                {name}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

window.HeroSection = HeroSection;
