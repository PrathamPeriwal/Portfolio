import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// ─── Keyframe injected once into <head> ────────────────────────────────────────
const marqueeKeyframe = `
  @keyframes skillsScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
`;

// ─── Data ──────────────────────────────────────────────────────────────────────
const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      "C++",
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "Go (Golang)",
      "SQL",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "Redux",
      "Tailwind CSS",
      "Django",
      "FastAPI",
      "REST APIs",
    ],
  },
  {
    title: "Databases, Cloud & DevOps",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "Supabase",
      "Prisma ORM",
      "Sequelize ORM",
      "AWS",
      "Docker",
      "DockerHub",
      "Kubernetes",
      "Firebase",
    ],
  },
  {
    title: "Developer Tools",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Linux",
      "Figma",
      "Framer",
      "Jupyter",
      "Colab",
    ],
  },
];

const Pill = ({ label }: { label: string }) => {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 18px",
        border: "1.5px solid #0a0a0a",
        borderRadius: "10px",
        background: hov ? "#0a0a0a" : "white",
        fontFamily: "var(--font-sans)",
        fontSize: "0.68rem",
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: hov ? "#ffffff" : "#0a0a0a",
        transition: "background 0.2s ease, color 0.2s ease",
        whiteSpace: "nowrap",
        flexShrink: 0,
        cursor: "default",
      }}
    >
      {label}
    </span>
  );
};

const SkillRow = ({
  category,
}: {
  category: (typeof skillCategories)[number];
}) => {
  const [hovered, setHovered] = useState(false);
  const duration = category.skills.length * 2.2;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: "1px solid black",
        height: "68px",
        display: "flex",
        alignItems: "center",
        background: hovered ? "#F8F8F8" : "white",
        transition: "background 0.25s ease",
        overflow: "hidden",
      }}
    >
      {/* Category title — fixed left column */}
      <div
        className="px-6 md:px-12 lg:px-16"
        style={{ flexShrink: 0, width: "clamp(200px, 28vw, 340px)" }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.82rem, 1.25vw, 1rem)",
            fontWeight: 500,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#0a0a0a",
            userSelect: "none",
          }}
        >
          {category.title}
        </span>
      </div>

      {/* Thin vertical rule */}
      <div
        style={{
          width: "1px",
          height: "30px",
          background: "#0a0a0a",
          flexShrink: 0,
          opacity: 0.18,
        }}
      />

      {/* Scrolling marquee area */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Left edge fade */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "56px",
            height: "100%",
            background: hovered
              ? "linear-gradient(to right, #F8F8F8, transparent)"
              : "linear-gradient(to right, white, transparent)",
            zIndex: 2,
            transition: "background 0.25s ease",
            pointerEvents: "none",
          }}
        />
        {/* Right edge fade */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "56px",
            height: "100%",
            background: hovered
              ? "linear-gradient(to left, #F8F8F8, transparent)"
              : "linear-gradient(to left, white, transparent)",
            zIndex: 2,
            transition: "background 0.25s ease",
            pointerEvents: "none",
          }}
        />

        <AnimatePresence initial={false}>
          {hovered ? (
            <motion.div
              key="marquee"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              style={{
                display: "flex",
                gap: "10px",
                width: "max-content",
                animation: `skillsScroll ${duration}s linear infinite`,
                paddingLeft: "16px",
              }}
            >
              {/* Doubled for a seamless loop — CSS animates to -50% */}
              {[...category.skills, ...category.skills].map((skill, i) => (
                <Pill key={`${skill}-${i}`} label={skill} />
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                color: "#999",
                textTransform: "uppercase",
                paddingLeft: "20px",
                userSelect: "none",
                margin: 0,
              }}
            >
              Hover to explore
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Skill count — right edge */}
      <div className="pr-6 md:pr-12 lg:pr-16" style={{ flexShrink: 0 }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            color: "#bbb",
            textTransform: "uppercase",
          }}
        >
          {category.skills.length}
        </span>
      </div>
    </div>
  );
};

const SkillsPhilosophy = () => {
  return (
    <>
      <style>{marqueeKeyframe}</style>
      <section className="min-h-screen bg-white text-black font-sans flex flex-col justify-center">
        <div className="w-full px-6 md:px-12 lg:px-16 pt-24 pb-6 md:pt-12 md:pb-6 bg-white z-10 md:flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-y-8"
          >
            <div className="md:col-span-1">
              <h2 className="text-xs font-bold uppercase tracking-widest">
                Skills &amp; Philosophy
              </h2>
            </div>
            <div className="md:col-span-4">
              <blockquote className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase leading-tight">
                "The function of good software is to make the complex appear to
                be simple."
              </blockquote>
            </div>
          </motion.div>
        </div>

        {/* Skills Rows */}
        <div className="w-full border-t border-black mt-16">
          {skillCategories.map((category) => (
            <SkillRow key={category.title} category={category} />
          ))}
        </div>
      </section>
    </>
  );
};

export default SkillsPhilosophy;
