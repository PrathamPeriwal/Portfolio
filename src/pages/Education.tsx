import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EDU_ITEMS = [
  {
    degree: "B.Tech — Electronics & Communication Engineering",
    institution: "Birla Institute of Technology, Mesra, Ranchi",
    years: "2023 – 2027",
    description:
      "Pursuing a degree in Electronics and Communication Engineering with a focus on Signal Processing and Deep Learning. Engaged in various projects and research activities.",
    achievements: [
      "Vice President, ECESOC",
      "Events Head, Rotaract Club (Rotary)",
    ],
    side: "left" as const,
  },
  {
    degree: "Class XII – APBIE",
    institution: "FIITJEE Junior College, Visakhapatnam",
    years: "2021 – 2023",
    description:
      "Completed senior secondary education with Physics, Chemistry, and Mathematics, building strong analytical and quantitative foundations while preparing for competitive engineering entrance examinations.",
    achievements: [
      "Scored 93.8%",
      "Cracked IIT — JEE Advanced Rank 17,032",
    ],
    side: "right" as const,
  },
  {
    degree: "Class X – ICSE",
    institution: "Timpany Schools, Visakhapatnam",
    years: "2009 – 2021",
    description:
      "Completed secondary education with excellent academic performance while actively participating in science competitions, olympiads, and extracurricular activities.",
    achievements: [
      "Scored 97.4%",
      "Stood 14th in State-Level WIZ International Spell Bee Championship",
      "National Science Olympiad (NSO) Medalist (Multiple Years)",
    ],
    side: "left" as const,
  },
];

const EduCard = ({
  item,
  index,
}: {
  item: (typeof EDU_ITEMS)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.set(card, { opacity: 0, y: 28, scale: 0.98 });
    const ctx = gsap.context(() => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.72,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="edu-card group"
      style={{
        background: "#0E0E0E",
        border: "1px solid #262626",
        borderRadius: "18px",
        padding: "clamp(24px, 3vw, 38px)",
        width: "100%",
        maxWidth: "510px",
        boxShadow: "0 4px 32px rgba(0,0,0,0.55)",
        transition:
          "transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.32s ease, box-shadow 0.32s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = "#3C3C3C";
        e.currentTarget.style.boxShadow = "0 18px 56px rgba(0,0,0,0.75)";
        const pill = e.currentTarget.querySelector<HTMLElement>(".year-pill");
        if (pill) pill.style.borderColor = "rgba(255,255,255,0.22)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#262626";
        e.currentTarget.style.boxShadow = "0 4px 32px rgba(0,0,0,0.55)";
        const pill = e.currentTarget.querySelector<HTMLElement>(".year-pill");
        if (pill) pill.style.borderColor = "rgba(255,255,255,0.10)";
      }}
    >
      {/* Degree */}
      <h3
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)",
          color: "#FFFFFF",
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          marginBottom: "6px",
        }}
      >
        {item.degree}
      </h3>

      {/* Institution */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: "clamp(0.78rem, 1vw, 0.875rem)",
          color: "#666666",
          marginBottom: "14px",
          letterSpacing: "0.01em",
        }}
      >
        {item.institution}
      </p>

      {/* Year Pill */}
      <span
        className="year-pill"
        style={{
          display: "inline-block",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#888888",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "9999px",
          padding: "5px 12px",
          marginBottom: "20px",
          transition: "border-color 0.32s ease",
        }}
      >
        {item.years}
      </span>

      {/* Description */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 300,
          fontSize: "clamp(0.78rem, 0.9vw, 0.84rem)",
          color: "#5F5F5F",
          lineHeight: 1.78,
          marginBottom: "22px",
        }}
      >
        {item.description}
      </p>

      {/* Achievements */}
      <div>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: "9px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#444444",
            marginBottom: "10px",
          }}
        >
          Achievements
        </p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          {item.achievements.map((a, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.76rem, 0.88vw, 0.82rem)",
                color: "#888888",
                lineHeight: 1.55,
              }}
            >
              <span
                style={{
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  background: "#505050",
                  flexShrink: 0,
                  marginTop: "7px",
                }}
              />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TimelineNode = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { scale: 0, opacity: 0 });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: "1.5px solid rgba(255,255,255,0.16)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        background: "transparent",
        position: "relative",
        zIndex: 4,
      }}
    >
      <div
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: "#FFFFFF",
        }}
      />
    </div>
  );
};

const Education = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const desktopProgressRef = useRef<HTMLDivElement>(null);
  const mobileProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const children = el.querySelectorAll(".edu-anim");
    gsap.set(children, { opacity: 0, y: 28 });
    const ctx = gsap.context(() => {
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // Scroll progress line
  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;
    gsap.set([desktopProgressRef.current, mobileProgressRef.current], { scaleY: 0 });
    const ctx = gsap.context(() => {
      gsap.to([desktopProgressRef.current, mobileProgressRef.current], {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 58%",
          end: "bottom 58%",
          scrub: 0.4,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        background: "#000000",
        width: "100%",
        paddingTop: "72px",
        paddingBottom: "72px",
        fontFamily: "Inter, sans-serif",
        color: "#FFFFFF",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          paddingLeft: "clamp(24px, 5vw, 96px)",
          paddingRight: "clamp(24px, 5vw, 96px)",
        }}
      >
        {/* Header */}
        <div ref={headingRef} style={{ marginBottom: "clamp(52px, 7vw, 88px)" }}>
          <p
            className="edu-anim"
            style={{
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#555555",
              marginBottom: "14px",
            }}
          >
            {/* 05 / Education */}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "12px 16px" }}>
            <h2
              className="edu-anim"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.8rem, 7.5vw, 7.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              My Academic
            </h2>
            <span
              className="edu-anim"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(2.8rem, 7.5vw, 7.5rem)",
                lineHeight: 0.95,
                color: "#BEBEBE",
              }}
            >
              Journey
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} style={{ position: "relative" }}>

          {/* Central line */}
          <div
            className="timeline-line-desktop"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "1px",
              background: "#2A2A2A",
              zIndex: 1,
            }}
          />
          {/* White scroll-progress overlay */}
          <div
            ref={desktopProgressRef}
            className="timeline-line-desktop"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%) scaleY(0)",
              transformOrigin: "top center",
              width: "2px",
              background: "#FFFFFF",
              zIndex: 2,
            }}
          />

          {/* Left rail */}
          <div
            className="timeline-line-mobile"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "11px",
              width: "1px",
              background: "#2A2A2A",
              zIndex: 1,
            }}
          />
          {/* White scroll-progress overlay */}
          <div
            ref={mobileProgressRef}
            className="timeline-line-mobile"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "11px",
              width: "2px",
              background: "#FFFFFF",
              transform: "scaleY(0)",
              transformOrigin: "top center",
              zIndex: 2,
            }}
          />

          {/* Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(48px, 7vw, 80px)" }}>
            {EDU_ITEMS.map((item, i) => (
              <div key={i} style={{ position: "relative" }} className="edu-row">

                {/* Desktop layout */}
                <div className="edu-desktop-row" style={{ display: "grid", gridTemplateColumns: "1fr 56px 1fr", alignItems: "flex-start" }}>

                  {/* Left cell */}
                  <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "28px" }}>
                    {item.side === "left" ? <EduCard item={item} index={i} /> : null}
                  </div>

                  {/* Center - node */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "32px", position: "relative", zIndex: 3 }}>
                    <TimelineNode />
                  </div>

                  {/* Right cell */}
                  <div style={{ paddingLeft: "28px" }}>
                    {item.side === "right" ? <EduCard item={item} index={i} /> : null}
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="edu-mobile-row" style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                  {/* Node column */}
                  <div style={{ display: "flex", alignItems: "flex-start", paddingTop: "28px", position: "relative", zIndex: 3, flexShrink: 0 }}>
                    <TimelineNode />
                  </div>
                  {/* Card */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <EduCard item={item} index={i} />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        .timeline-line-mobile { display: none !important; }
        .timeline-line-desktop { display: block; }
        .edu-desktop-row { display: grid !important; }
        .edu-mobile-row  { display: none  !important; }

        @media (max-width: 767px) {
          .timeline-line-mobile { display: block !important; }
          .timeline-line-desktop { display: none  !important; }
          .edu-desktop-row { display: none  !important; }
          .edu-mobile-row  { display: flex  !important; }
        }
      `}</style>
    </section>
  );
};

export default Education;
