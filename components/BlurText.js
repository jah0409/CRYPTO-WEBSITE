const { motion, useReducedMotion } = Motion;
const { useRef, useState, useEffect } = React;

function BlurText({ text, className }) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <p
      ref={containerRef}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '0.1em' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { filter: 'blur(10px)', opacity: 0, y: 50 }
          }
          animate={
            inView
              ? prefersReducedMotion
                ? { opacity: 1 }
                : {
                    filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                    opacity: [0, 0.5, 1],
                    y: [50, -5, 0],
                  }
              : prefersReducedMotion
              ? { opacity: 0 }
              : { filter: 'blur(10px)', opacity: 0, y: 50 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0.7, delay: i * 0.1 }
              : { duration: 0.7, ease: 'easeOut', delay: i * 0.1, times: [0, 0.5, 1] }
          }
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

window.BlurText = BlurText;
