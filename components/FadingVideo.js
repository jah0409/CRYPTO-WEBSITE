const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55;

function FadingVideo({ src, className, style }) {
  const videoRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const fadingOutRef = React.useRef(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '0';

    function fadeTo(target) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      const start = parseFloat(video.style.opacity) || 0;
      const t0 = performance.now();
      function tick(now) {
        const t = Math.min((now - t0) / FADE_MS, 1);
        video.style.opacity = String(start + (target - start) * t);
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
        else rafRef.current = null;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    function onLoadedData() {
      video.style.opacity = '0';
      video.play().catch(() => {});
      fadeTo(1);
    }

    function onTimeUpdate() {
      if (!video.duration || isNaN(video.duration)) return;
      const rem = video.duration - video.currentTime;
      if (!fadingOutRef.current && rem > 0 && rem <= FADE_OUT_LEAD) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    }

    function onEnded() {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        fadingOutRef.current = false;
        video.play().catch(() => {});
        fadeTo(1);
      }, 100);
    }

    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    // Handle already-cached/loaded video
    if (video.readyState >= 2) onLoadedData();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ ...style, opacity: 0 }}
    />
  );
}

window.FadingVideo = FadingVideo;
