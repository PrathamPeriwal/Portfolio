import React, { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { useScramble } from "@/hooks/use-scramble";

import About from "./About";
import Experience from "./Experience";
import SplashCursor from "@/components/SplashCursor";
import SelectedWorks from "./SelectedWorks";
import VectorBridge from "./VectorBridge";
import Footer from "./Footer";
import Contact from "./Contact";
import Education from "./Education";
import Navigation from "@/components/Navigation";

const CursorFollower = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100, mass: 0.8 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-gray-400/50 rounded-full pointer-events-none z-[9999] hidden lg:block backdrop-blur-[1px]"
      style={{ x, y }}
    />
  );
};

const BrandLogo = () => (
  <div className="fixed top-6 left-6 md:top-8 md:left-10 z-50 mix-blend-difference">
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
    >
      <h1 className="font-sans font-black text-2xl md:text-4xl tracking-tighter text-white flex items-start">
        Pratham
      </h1>
    </button>
  </div>
);

const AvailabilityBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="absolute z-10 top-9 inset-x-0 w-full hidden md:flex justify-center items-center pointer-events-none"
  >
    <div className="flex items-center justify-end flex-1 gap-3 pr-3">
      <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
      </span>
      <span className="font-sans font-black text-[9px] tracking-[0.25em] uppercase text-white leading-none">
        Available for work
      </span>
    </div>

    <span className="w-[1px] h-[9px] bg-white/20 flex-shrink-0" />

    <div className="flex items-center justify-start flex-1 pl-3">
      <span className="font-sans font-medium text-[8px] tracking-[0.2em] uppercase text-white/35 leading-none">
        Remote&nbsp;·&nbsp;Worldwide
      </span>
    </div>
  </motion.div>
);


const SocialStrip = () => {
  const socials = [
    { label: "GitHub", href: "https://github.com/PrathamPeriwal" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/prathamperiwal/" },
    { label: "Instagram", href: "https://www.instagram.com/me_prathamperiwal" },
    { label: "Email", href: "mailto:prathamperiwal5@gmail.com" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute z-20 hidden md:flex flex-col items-center"
      style={{ right: 0, top: "1.7rem", gap: "1rem" }}
    >
      <span className="w-[1px] h-7 bg-white/30 flex-shrink-0" />
      {socials.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? "_self" : "_blank"}
          rel="noopener noreferrer"
          title={label}
          className="group flex-shrink-0"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <span className="font-sans font-black text-[10px] tracking-[0.22em] uppercase text-white group-hover:opacity-100 transition-opacity duration-300">
            {label}
          </span>
        </a>
      ))}
      <span className="w-[1px] h-7 bg-white/30 flex-shrink-0" />
    </motion.div>
  );
};

const MobileSocialStrip = () => {
  const socials = [
    { label: "Github", icon: Github, href: "https://github.com/PrathamPeriwal" },
    { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/prathamperiwal/" },
    { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/me_prathamperiwal" },
    { label: "Email", icon: Mail, href: "mailto:prathamperiwal5@gmail.com" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-6"
    >
      {socials.map(({ label, icon: Icon, href }) => (
        <a key={label} href={href} target={href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer"
          className="text-white hover:opacity-75 transition-opacity duration-300 block">
          <Icon size={18} strokeWidth={2.5} />
        </a>
      ))}
    </motion.div>
  );
};


const FIRST_NAME = 'Pratham';
const LAST_NAME  = 'Periwal';
const TAGLINE    = 'Software Engineer designing intelligent products where scalable architecture, applied AI, and exceptional user experiences work as one.';

const HeroContent = () => {
  // Three independent scramble instances
  const { ref: firstRef } = useScramble(FIRST_NAME, { travelMs: 620, pool: 'dense', playOnMount: true, mountDelay: 300 });
  const { ref: lastRef } = useScramble(LAST_NAME, { travelMs: 580, pool: 'dense', playOnMount: true, mountDelay: 640 });
  const { ref: taglineRef, trigger: triggerTagline } = useScramble(TAGLINE, { travelMs: 900, pool: 'tagline', playOnMount: false });

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const t = setTimeout(triggerTagline, 1000);
    return () => clearTimeout(t);
  }, [triggerTagline]);

  return (
    <div className="z-10 mt-auto flex flex-col relative">
      <SocialStrip />
      {/* Heading block */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="font-sans font-bold text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] leading-[0.85] tracking-tighter text-white text-left pt-4">
          <span
            ref={firstRef as React.RefObject<HTMLSpanElement>}
            className="block cursor-default select-none"
          >
            {FIRST_NAME}
          </span>
          <span
            ref={lastRef as React.RefObject<HTMLSpanElement>}
            className="block cursor-default select-none"
          >
            {LAST_NAME}
          </span>
        </h1>
      </motion.div>

      {/* Tagline Block */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
        className="w-full pr-[70px] md:pr-[120px] mt-2 md:mt-4"
      >
        <div className="w-12 h-[2px] bg-white mb-4 md:hidden" />
        <p
          ref={taglineRef as React.RefObject<HTMLParagraphElement>}
          className="font-serif italic text-lg md:text-xl lg:text-2xl font-normal text-white/90 leading-relaxed tracking-wide text-left cursor-default select-none"
        >
          {TAGLINE}
        </p>
      </motion.div>

      {/* Pills and CTAs row */}
      <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-end gap-6 mt-6 md:mt-8 mb-2 pr-0">
        {/* Expertise Tags */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="flex flex-wrap gap-2 md:gap-3"
        >
          {['SOFTWARE DEVELOPER', 'SYSTEMS ENGINEER', 'AI/ML ENGINEER', 'CLOUD'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 md:px-4 md:py-2 border border-white/20 rounded-full font-sans text-[9px] md:text-[10px] font-medium tracking-[0.2em] text-white/70 uppercase hover:bg-white hover:text-black transition-colors duration-300 cursor-default select-none whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex flex-row flex-wrap items-center gap-3"
        >
          {/* Primary CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden border border-white px-5 py-3 md:px-6 md:py-3 flex items-center gap-2 md:gap-3 transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 shrink-0"
            aria-label="View Resume"
          >
            <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
            <span className="relative font-sans font-black text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white group-hover:text-black transition-colors duration-300 z-10 whitespace-nowrap">
              View Resume
            </span>
            <svg
              className="relative w-3 h-3 text-white group-hover:text-black transition-colors duration-300 z-10"
              viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"
            >
              <path d="M1 6h10M6 1l5 5-5 5" />
            </svg>
          </a>

          {/* Secondary CTA */}
          <a
            href="#contact"
            className="group relative overflow-hidden border border-white/30 px-5 py-3 md:px-6 md:py-3 flex items-center gap-2 md:gap-3 hover:border-white transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 shrink-0"
            aria-label="Contact Me"
          >
            <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
            <span className="relative font-sans font-black text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white group-hover:text-black transition-colors duration-300 z-10 whitespace-nowrap">
              Contact Me
            </span>
            <svg
              className="relative w-3 h-3 text-white group-hover:text-black transition-colors duration-300 z-10"
              viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"
            >
              <path d="M1 6h10M6 1l5 5-5 5" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

const Index = () => {
  const footerContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerContainerRef,
    offset: ["start end", "end end"]
  });

  const footerY = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <div className="min-h-screen relative bg-black selection:bg-white selection:text-black">
      <BrandLogo />
      <CursorFollower />
      <Navigation />

      {/* Fixed background About section */}
      <div className="fixed inset-0 z-0 bg-white text-black">
        <About />
      </div>

      {/* Hero */}
      <section className="relative h-screen bg-black flex flex-col px-6 pt-14 pb-32 md:px-16 md:pt-20 md:pb-48 z-20 overflow-hidden">
        <AvailabilityBadge />
        <div className="hidden lg:block"><SplashCursor /></div>

        {/* Mobile Midpoint Buffer*/}
        <div className="h-[32px] w-full md:hidden" />

        {/* Dynamic Centering Container for Mobile Socials */}
        <div className="flex-1 flex flex-col items-end justify-center md:hidden pr-0 z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <MobileSocialStrip />
          </div>
        </div>

        <HeroContent />
      </section>

      <div className="relative z-20 w-full bg-transparent">
        <div id="about" className="h-screen w-full pointer-events-none" />

        <div id="experience" className="relative z-20">
          <Experience />
        </div>

        <div id="work" className="bg-black text-white relative z-20">
          <SelectedWorks />
        </div>

        <div className="bg-white text-black relative z-20">
          <VectorBridge />
        </div>

        <div className="bg-black text-white relative z-20">
          <Education />
        </div>

        <div id="contact" className="relative z-20 bg-white text-black">
          <Contact />
        </div>
      </div>

      {/* Parallax Footer Reveal Stack */}
      <div ref={footerContainerRef} className="relative z-0 h-screen w-full overflow-hidden bg-black text-white">
        <motion.div style={{ y: footerY }} className="h-full w-full">
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;