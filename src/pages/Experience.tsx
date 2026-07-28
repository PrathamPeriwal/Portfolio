import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  year: string;
  duration: string;
  mode: string;
  company: string;
  role: string;
  bullets: string[];
  tags: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    year: "2026",
    duration: "May - July",
    mode: "On-site • INTERN",
    company: "Bhabha Atomic Research Centre",
    role: "AI / ML Engineer",
    bullets: [
      "Built end-to-end machine learning pipelines for large-scale scientific datasets, covering data preprocessing, feature engineering, and model evaluation.",
      "Benchmarked multiple feature representations and supervised learning models using classification, regression, and dimensionality reduction techniques.",
      "Developed reproducible ML workflows for high-dimensional data analysis, enabling robust experimentation and performance optimization.",
    ],
    tags: [
      "PYTHON",
      "SCIKIT-LEARN",
      "LIGHTGBM",
      "XGBOOST",
      "PANDAS",
      "NUMPY",
      "MATPLOTLIB",
    ],
  },
  {
    year: "2025",
    duration: "September - November",
    mode: "REMOTE • INTERN",
    company: "Dev Innovations Labs",
    role: "Full Stack Developer",
    bullets: [
      "Built and scaled full-stack web applications using Next.js, Node.js, Express.js and MongoDB.",
      "Developed secure REST APIs and modular backend services while creating responsive production-ready interfaces.",
      "Integrated AI-powered workflows and machine learning features into real-world applications to improve automation and user experience.",
    ],
    tags: [
      "NEXT.JS",
      "NODE.JS",
      "EXPRESS",
      "POSTGRESQL",
      "MONGODB",
      "SEQUELIZE",
      "TAILWIND",
    ],
  },
];

const ExperienceCard = ({
  exp,
  index,
}: {
  exp: ExperienceItem;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const year = card.querySelector(".exp-year");
    const right = card.querySelector(".exp-right");
    const tags = card.querySelectorAll(".exp-tag");

    const footer = card.querySelector(".exp-footer");

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          containerAnimation: undefined,
          start: "left 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        year,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      )
        .fromTo(
          right,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          tags,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .fromTo(footer, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");
    });

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        year,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      )
        .fromTo(
          right,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          tags,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .fromTo(footer, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="exp-card flex-shrink-0 w-full md:w-screen h-auto md:h-full flex flex-col justify-between px-6 md:px-16 lg:px-24 py-12 md:py-16 lg:py-20 relative"
      data-index={index}
    >
      <div className="hidden md:block h-6" />

      {/* Inner card: 2-column split */}
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center my-auto pb-16 md:pb-0">
        {/* LEFT: Year + Duration */}
        <div className="exp-year flex flex-col items-center justify-center gap-0 opacity-0 md:border-r border-black/10 md:pr-12 lg:pr-20">
          <span
            className="leading-none tracking-tight select-none text-center"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(180px, 24vw, 320px)",
              color: "#777777",
              lineHeight: 0.85,
              fontVariantNumeric: "lining-nums",
            }}
          >
            {exp.year}
          </span>
          <span
            className="font-sans uppercase tracking-[0.25em] text-[11px] md:text-xs font-medium text-center mt-2"
            style={{ color: "#666666" }}
          >
            {exp.duration}
          </span>
        </div>

        {/* RIGHT: All content */}
        <div className="exp-right flex flex-col gap-5 opacity-0">
          {/* Mode label */}
          <span
            className="font-sans uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium"
            style={{ color: "#888888" }}
          >
            {exp.mode}
          </span>

          {/* Role & Company */}
          <div className="flex flex-col gap-1">
            <p
              className="font-sans font-medium text-black/40"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
            >
              {exp.company}
            </p>

            <h1
              className="font-sans leading-tight tracking-tight text-black font-black"
              style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)" }}
            >
              {exp.role}
            </h1>
          </div>

          {/* Bullets */}
          <ul className="flex flex-col gap-1">
            {exp.bullets.map((b, i) => (
              <li
                key={i}
                className="font-sans font-normal leading-normal text-black/60 flex gap-3"
                style={{ fontSize: "clamp(0.8rem, 0.95vw, 0.9rem)" }}
              >
                <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-black/15 flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="exp-tag inline-flex items-center px-3 py-1.5 border border-black/20 font-sans font-medium uppercase tracking-[0.15em] text-black/50 opacity-0"
                style={{
                  fontSize: "9px",
                  borderRadius: "9999px",
                  background: "rgba(0,0,0,0.02)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Small footer positioned at the absolute bottom of the viewport section */}
      <div className="exp-footer absolute bottom-2 md:bottom-4 left-6 right-6 md:left-16 md:right-16 lg:left-24 lg:right-24 pt-2.5 border-t border-black/10 opacity-0">
        <p
          className="font-sans font-medium tracking-[0.28em] uppercase text-[10px]"
          style={{ color: "#777777" }}
        >
          0{index + 1} &middot; {exp.role} &middot; {exp.company}
        </p>
      </div>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intro = introRef.current;
    if (!intro) return;

    const label = intro.querySelector(".exp-intro-label");
    const sans = intro.querySelector(".exp-heading-sans");
    const serif = intro.querySelector(".exp-heading-serif");
    const divider = dividerRef.current;

    gsap.fromTo(
      [label, sans, serif, divider],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: intro,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  // Horizontal scroll pin
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const totalWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, {
        x: -scrollDistance,
        ease: "none",
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars.trigger === section) t.kill();
        });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* PART 1 — EDITORIAL INTRO */}
      <div
        ref={introRef}
        className="relative z-20 bg-white w-full px-6 md:px-16 lg:px-24 pt-28 md:pt-36 pb-8 md:pb-10 overflow-hidden"
      >
        <p
          className="exp-intro-label font-sans font-medium tracking-[0.28em] uppercase mb-2 opacity-0"
          style={{ fontSize: "10px", color: "#A0A0A0" }}
        >
          {/* 04 / Experience */}
        </p>

        <h2 className="relative overflow-visible flex flex-row flex-wrap items-baseline gap-3 md:gap-5">
          <span
            className="exp-heading-sans font-sans font-black leading-none tracking-tighter text-black opacity-0"
            style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)", lineHeight: 1 }}
          >
            Where I've
          </span>
          <span
            className="exp-heading-serif opacity-0"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(3.5rem, 9vw, 9rem)",
              lineHeight: 0.95,
              color: "#BEBEBE",
            }}
          >
            Worked
          </span>
        </h2>

        {/* Horizontal divider */}
        <div
          ref={dividerRef}
          className="mt-4 md:mt-10 w-full h-px bg-black/10 opacity-0"
        />
      </div>

      {/* PART 2 — HORIZONTAL TIMELINE (light grey bg)
          Desktop: GSAP pinned horizontal scroll
          Mobile: vertical cards */}

      {/* DESKTOP */}
      <section
        ref={sectionRef}
        className="relative z-20 hidden md:block overflow-hidden"
        style={{ background: "#EAEAEA", height: "100vh" }}
        aria-label="Experience timeline"
      >
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${EXPERIENCES.length * 100}vw` }}
        >
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </section>

      {/* MOBILE */}
      <div
        className="relative z-20 md:hidden flex flex-col"
        style={{ background: "#EAEAEA" }}
        aria-label="Experience timeline (mobile)"
      >
        {EXPERIENCES.map((exp, i) => (
          <div
            key={exp.company}
            className="px-6 py-16 border-b border-black/10 last:border-b-0"
          >
            <ExperienceCard exp={exp} index={i} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Experience;
