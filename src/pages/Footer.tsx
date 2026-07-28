import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// ─── Animated link ─────────────────────────────────────────────────────────────
const FooterLink = ({
  href,
  label,
  external = true,
}: {
  href: string;
  label: string;
  external?: boolean;
}) => (
  <motion.a
    href={href}
    target={external ? "_blank" : "_self"}
    rel={external ? "noopener noreferrer" : undefined}
    className="group relative flex items-center gap-2 w-fit"
    whileHover={{ y: -2 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
  >
    <span className="font-sans text-sm font-medium tracking-wide text-white/55 group-hover:text-white transition-colors duration-300">
      {label}
    </span>
    <span className="text-white/35 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out text-sm">
      ↗
    </span>
    {/* Sliding underline */}
    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/50 transition-all duration-300 ease-out group-hover:w-[calc(100%-1.2rem)]" />
  </motion.a>
);

// ─── Back to top ───────────────────────────────────────────────────────────────
const BackToTop = () => (
  <motion.button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="group flex items-center gap-2.5 text-white/35 hover:text-white transition-colors duration-400"
    aria-label="Back to top"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.5 }}
  >
    <span className="font-sans text-[10px] tracking-[0.26em] uppercase font-medium">
      Back to top
    </span>
    <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1.5 text-base">
      ↑
    </span>
  </motion.button>
);

// ─── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Very subtle parallax on watermark
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], [24, 0]);

  const stagger = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const links = [
    { href: "https://github.com/PrathamPeriwal", label: "GitHub" },
    { href: "https://www.linkedin.com/in/prathamperiwal/", label: "LinkedIn" },
    { href: "mailto:prathamperiwal5@gmail.com", label: "Email", external: false },
    { href: "/resume.pdf", label: "Resume", external: false },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-black text-white font-sans h-screen flex flex-col overflow-hidden"
    >
      {/* Radial depth glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 90%, rgba(255,255,255,0.05) 0%, transparent 65%)",
        }}
      />

      {/* ── Watermark ─ outlined, low contrast, large ─────────────────────── */}
      <motion.div
        style={{ y: watermarkY }}
        className="pointer-events-none absolute bottom-[-2%] left-[-2%] right-[-2%] z-0 flex items-end overflow-hidden"
        aria-hidden
      >
        <h2
          className="font-sans font-black select-none leading-none w-full"
          style={{
            fontSize: "clamp(6rem, 26vw, 28rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.05)",
            letterSpacing: "-0.04em",
          }}
        >
          Pratham
        </h2>
      </motion.div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex-1 flex flex-col px-6 md:px-16 pt-12 md:pt-16"
      >
        {/* ── Impact CTA heading ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={stagger}
          className="mb-10 md:mb-12"
        >
          <h2 className="font-sans font-black text-3xl md:text-5xl lg:text-6xl tracking-tighter text-white leading-[1.05]">
            Ready to build something<br className="hidden md:block" /> remarkable?
          </h2>
          <div className="mt-6 h-px w-full bg-white/10" />
        </motion.div>

        {/* ── Three columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.6fr] gap-8 md:gap-10">

          {/* Left — Branding block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={stagger}
            className="flex flex-col gap-4"
          >
            <div>
              <p className="font-sans font-black text-xl md:text-2xl tracking-tighter text-white">
                Pratham
              </p>
              <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-white/35 mt-0.5">
                Software Engineer
              </p>
            </div>

            <p className="font-serif italic text-sm text-white/50 leading-relaxed max-w-[34ch]">
              Building intelligent software where scalable architecture,
              thoughtful engineering, and applied AI come together to create
              products that people genuinely enjoy using.
            </p>

            <div className="flex flex-col gap-0.5 mt-1">
              <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-white/25">
                Visakhapatnam, India
              </p>
              <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-white/25">
                Remote&nbsp;·&nbsp;Worldwide
              </p>
            </div>
          </motion.div>

          {/* Center — Connect */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={stagger}
            className="flex flex-col gap-4"
          >
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/30 font-medium">
              Connect
            </p>
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <FooterLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  external={link.external !== false}
                />
              ))}
            </div>
          </motion.div>

          {/* Right — Colophon */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={stagger}
            className="flex flex-col gap-4"
          >
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/30 font-medium">
              Built with
            </p>

            <p className="font-sans text-sm text-white/45 leading-relaxed">
              React&nbsp;•&nbsp;TypeScript&nbsp;•&nbsp;GSAP&nbsp;•&nbsp;Framer&nbsp;Motion
              <br />
              Lenis&nbsp;•&nbsp;Tailwind CSS
            </p>

            <p className="font-serif italic text-xs text-white/30 leading-relaxed max-w-[28ch]">
              Crafted with attention to performance, motion, accessibility, and
              developer experience.
            </p>

            <div className="mt-1">
              <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-white/22 mb-1">
                Designed &amp; Developed by
              </p>
              <p className="font-sans text-sm font-semibold text-white/55 tracking-wide">
                Pratham Periwal
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="relative z-10 px-6 md:px-16 pb-6 md:pb-8 flex items-center justify-between"
      >
        <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-white/18">
          © 2026 Pratham Periwal
        </p>
        <BackToTop />
      </motion.div>
    </footer>
  );
};

export default Footer;