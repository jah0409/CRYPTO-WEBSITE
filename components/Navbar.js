function NavArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function Navbar() {
  const links = ['Home', 'Voyages', 'Worlds', 'Innovation', 'Plan Launch'];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 flex items-center justify-between">

      {/* Logo — 48×48 liquid-glass circle */}
      <div className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="font-heading italic text-white" style={{ fontSize: '1.125rem', lineHeight: 1 }}>a</span>
      </div>

      {/* Center nav — desktop only */}
      <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1.5">
        {links.map((link) => (
          <a key={link} href="#"
            className="px-3 py-2 text-sm font-medium text-white/90 font-body whitespace-nowrap hover:text-white transition-colors">
            {link}
          </a>
        ))}
        <button type="button"
          className="ml-1 flex items-center gap-1.5 bg-white text-black rounded-full px-4 py-2 text-sm font-medium font-body whitespace-nowrap">
          Claim a Spot
          <NavArrowUpRight />
        </button>
      </div>

      {/* Right spacer — balances logo so center nav is truly centered */}
      <div className="w-12 h-12 flex-shrink-0 invisible" aria-hidden="true" />
    </div>
  );
}

window.Navbar = Navbar;
