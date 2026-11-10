import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { prefersReducedMotion } from "./lib/reduced-motion";

// Keeps Lenis smooth scroll in sync with GSAP ScrollTrigger
const LenisScrollTriggerBridge = () => {
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return null;
};

const App = () => {
  const reducedMotion = prefersReducedMotion();

  return (
  <MotionConfig reducedMotion="user">
  <ReactLenis root options={{
    autoRaf: true,
    smoothWheel: !reducedMotion,
    duration: reducedMotion ? 0 : 1.2,
    wheelMultiplier: 0.9,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    syncTouch: false,
  }}>
    <LenisScrollTriggerBridge />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ReactLenis>
  </MotionConfig>
  );
};

export default App;