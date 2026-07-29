import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const STATS = [
  { value: "3+",   label: "Years of Practice"        }, 
  { value: "1+",   label: "Years of Work Experience"  },
  { value: "10+",  label: "Projects Completed"        },
  { value: "500+", label: "DSA Problems Solved"           },
];

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/PrathamPeriwal"                        },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/prathamperiwal/"  },
];

const About = () => {
  const [vh, setVh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollY } = useScroll();

  const y1       = useTransform(scrollY, [0,          vh * 0.45], [60, 0]);
  const opacity1 = useTransform(scrollY, [0,          vh * 0.40], [0, 1]);

  const y2       = useTransform(scrollY, [vh * 0.05,  vh * 0.50], [60, 0]);
  const opacity2 = useTransform(scrollY, [vh * 0.05,  vh * 0.45], [0, 1]);

  const y3       = useTransform(scrollY, [vh * 0.05,  vh * 0.45], [60, 0]);
  const opacity3 = useTransform(scrollY, [vh * 0.05,  vh * 0.40], [0, 1]);

  const y4       = useTransform(scrollY, [vh * 0.15,  vh * 0.55], [60, 0]);
  const opacity4 = useTransform(scrollY, [vh * 0.15,  vh * 0.50], [0, 1]);

  const y5       = useTransform(scrollY, [vh * 0.25,  vh * 0.65], [60, 0]);
  const opacity5 = useTransform(scrollY, [vh * 0.25,  vh * 0.60], [0, 1]);

  return (
    <section className="relative z-10 min-h-screen w-full bg-white text-black font-sans px-6 md:px-12 lg:px-20 flex items-center py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 lg:gap-x-5 gap-y-16 w-full max-w-[1600px] mx-auto">

        {/* LEFT COLUMN (50%)  */}
        <div className="md:col-span-6 lg:col-span-6 flex flex-col gap-8 pr-0 lg:pr-8">

          {/* Stats Grid (2x2) */}
          <motion.div style={{ y: y1, opacity: opacity1 }}>
            <div className="grid grid-cols-2 gap-x-10 gap-y-12 w-full">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-2 pb-5 border-b border-black/20 w-full"
                >
                  <span className="font-sans font-black text-6xl md:text-7xl lg:text-[5.5rem] tracking-tighter leading-none text-black drop-shadow-sm">
                    {stat.value}
                  </span>
                  <span className="font-sans text-[9px] lg:text-[10px] font-bold tracking-[0.2em] uppercase text-black/50 leading-snug whitespace-nowrap mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Inline tech stack summary */}
          <motion.p
            style={{ y: y5, opacity: opacity5 }}
            className="font-sans text-sm lg:text-base tracking-[0.1em] text-black/40 leading-[1.8] mt-6"
          >
            <span className="font-semibold text-black/60 tracking-[0.15em]">Core:&nbsp;</span>
            TypeScript, Node.js, PostgreSQL, REST APIs, Docker, Git. Fluent in React & Next.js for when the system needs a face. I care about the whole system, not just the feature.
          </motion.p>

        </div>

        {/* RIGHT COLUMN (50%) */}
        <div className="md:col-span-6 lg:col-span-6 flex flex-col gap-10 justify-center">

          {/* Quote */}
          <motion.blockquote
            style={{ y: y3, opacity: opacity3 }}
            className="font-serif italic text-3xl md:text-4xl lg:text-5xl leading-[1.6] tracking-tight text-black/90 m-0 p-0"
          >
            &ldquo;I architect systems that don&rsquo;t just work&nbsp;&mdash; they scale,
            survive failure, and create a lasting impact.&rdquo;
          </motion.blockquote>

          {/* Bio paragraph */}
          <motion.div
            style={{ y: y4, opacity: opacity4 }}
            className="flex flex-col gap-4 lg:pr-12"
          >
            <p className="font-sans text-base md:text-lg lg:text-xl leading-[2] text-black/60 font-light">
              Passionate software developer with experience building scalable full-stack
              applications, intelligent AI/ML solutions, and cloud-powered systems. I enjoy
              designing software that balances performance, maintainability, and great user
              experiences while solving real-world problems.
            </p>
          </motion.div>


        </div>


      </div>
    </section>
  );
};

export default About;