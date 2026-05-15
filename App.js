// Suppress Framer Motion list-key dev warnings — benign in this CDN setup
const _origConsoleError = console.error.bind(console);
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Each child in a list should have a unique')) return;
  _origConsoleError(...args);
};

function App() {
  return (
    <React.Fragment>
      <HeroSection />
      <CapabilitiesSection />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
