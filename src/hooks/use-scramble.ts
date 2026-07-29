import { useRef, useCallback, useEffect } from "react";

const CHARS_DENSE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@_!∆%&";
const CHARS_LIGHT = "ABCDEFGHIJKLMNOPQRSTUVWXYZ —.";
const CHARS_TAGLINE = "abcdeffhiiiijklnoopqrrssssttuvvxyyz-,#@_!∆%&";

const CURSOR_FRAMES = ["█", "▓", "▒", "░"];
const CURSOR_FRAME_MS = 38;

const SCRAMBLE_PRE_MS = 110;

function randChar(pool: string): string {
  return pool[Math.floor(Math.random() * pool.length)];
}
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function runScramble(
  el: HTMLElement,
  original: string,
  travelMs: number,
  pool: string,
  onDone?: () => void,
): () => void {
  let rafId = 0;
  let cancelled = false;
  const startTime = performance.now();
  const chars = original.split("");
  const total = chars.length;

  const scrambled = chars.map((c) => (c === " " ? " " : randChar(pool)));

  function buildHTML(cursorPos: number | null): string {
    let html = "";
    for (let i = 0; i < total; i++) {
      if (chars[i] === " ") {
        html += " ";
        continue;
      }

      if (cursorPos === null) {
        html += scrambled[i];
      } else if (i < cursorPos) {
        html += chars[i];
      } else if (i === cursorPos) {
        const frameIdx =
          Math.floor(performance.now() / CURSOR_FRAME_MS) %
          CURSOR_FRAMES.length;
        html += `<span style="opacity:0.7;color:#fff">${CURSOR_FRAMES[frameIdx]}</span>`;
      } else {
        scrambled[i] = randChar(pool);
        html += scrambled[i];
      }
    }
    return html;
  }

  function frame(now: number) {
    if (cancelled) return;
    const elapsed = now - startTime;

    if (elapsed < SCRAMBLE_PRE_MS) {
      for (let i = 0; i < total; i++) {
        if (chars[i] !== " ") scrambled[i] = randChar(pool);
      }
      el.innerHTML = buildHTML(null);
      rafId = requestAnimationFrame(frame);
      return;
    }

    const travelElapsed = elapsed - SCRAMBLE_PRE_MS;
    const rawProgress = Math.min(travelElapsed / travelMs, 1);
    const easedProgress = easeOutCubic(rawProgress);
    const cursorPos = Math.floor(easedProgress * (total - 1));

    if (rawProgress < 1) {
      el.innerHTML = buildHTML(cursorPos);
      rafId = requestAnimationFrame(frame);
    } else {
      el.textContent = original;
      onDone?.();
    }
  }

  rafId = requestAnimationFrame(frame);
  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
  };
}

export interface ScrambleOptions {
  travelMs?: number;
  pool?: "dense" | "light" | "tagline";
  playOnMount?: boolean;
  mountDelay?: number;
}

export function useScramble(original: string, options: ScrambleOptions = {}) {
  const {
    travelMs = 680,
    pool = "dense",
    playOnMount = false,
    mountDelay = 300,
  } = options;

  const ref = useRef<HTMLElement | null>(null);
  const cancelRef = useRef<(() => void) | null>(null);
  const runningRef = useRef(false);
  const charPool =
    pool === "tagline"
      ? CHARS_TAGLINE
      : pool === "light"
        ? CHARS_LIGHT
        : CHARS_DENSE;

  const trigger = useCallback(() => {
    const el = ref.current;
    if (!el || runningRef.current) return;

    runningRef.current = true;
    cancelRef.current = runScramble(el, original, travelMs, charPool, () => {
      runningRef.current = false;
      cancelRef.current = null;
    });
  }, [original, travelMs, charPool]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleEnter = () => {
      if (window.matchMedia("(hover: none)").matches) return;
      trigger();
    };

    el.addEventListener("mouseenter", handleEnter);
    return () => el.removeEventListener("mouseenter", handleEnter);
  }, [trigger]);

  useEffect(() => {
    if (!playOnMount) return;
    const t = setTimeout(trigger, mountDelay);
    return () => clearTimeout(t);
  }, [playOnMount, mountDelay, trigger]);

  useEffect(
    () => () => {
      cancelRef.current?.();
    },
    [],
  );

  return { ref, trigger };
}
