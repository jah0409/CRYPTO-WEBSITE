const { motion, useReducedMotion } = Motion;
const { useRef, useState, useEffect } = React;

function BlurText({ text, className }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '0.1em' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          initial={
            prefersReduced
              ? { opacity: 0 }
              : { filter: 'blur(10px)', opacity: 0, y: 50 }
          }
          animate={
            inView
              ? prefersReduced
                ? { opacity: 1 }
                : {
                    filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                    opacity: [0, 0.5, 1],
                    y: [50, -5, 0],
                  }
              : prefersReduced
              ? { opacity: 0 }
              : { filter: 'blur(10px)', opacity: 0, y: 50 }
          }
          transition={
            prefersReduced
              ? { duration: 0.7, delay: (i * 100) / 1000 }
              : { duration: 0.7, ease: 'easeOut', delay: (i * 100) / 1000, times: [0, 0.5, 1] }
          }
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

window.BlurText = BlurText;
