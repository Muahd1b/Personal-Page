"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import styles from "./page.module.css";
import { heroContent, heroPlainText } from "./content";

type LineType = "intro" | "line" | "sectionTitle" | "bullet" | "meta" | "spacer";
type RenderLineType = Exclude<LineType, "spacer">;

type Line = {
  type: LineType;
  text?: string;
};

const heroLines: Line[] = [
  { type: "intro", text: heroContent.intro },
  ...heroContent.lead.map((line) => ({ type: "line", text: line })),
];

heroContent.sections.forEach((section) => {
  heroLines.push({ type: "spacer" });
  heroLines.push({ type: "sectionTitle", text: section.title });
  section.items.forEach((item) => {
    heroLines.push({ type: "bullet", text: `- ${item}` });
  });
});

heroLines.push({ type: "spacer" });
heroLines.push({ type: "meta", text: heroContent.meta });

const classMap: Record<RenderLineType, string> = {
  intro: styles.intro,
  line: styles.line,
  sectionTitle: styles.sectionTitle,
  bullet: styles.bullet,
  meta: styles.meta,
};

const buildTypedMarkup = (
  lines: Line[],
  classes: typeof classMap,
) =>
  lines
    .map((line, index) => {
      const content =
        line.type === "spacer"
          ? ""
          : `<span class="${classes[line.type]}">${line.text ?? ""}</span>`;
      const needsBreak = index < lines.length - 1;
      return `${content}${needsBreak ? "<br/>" : ""}`;
    })
    .join("");

const heroClassNames = classMap;
const typedMarkup = buildTypedMarkup(heroLines, heroClassNames);

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  return prefersReducedMotion;
};

const useTypingAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastBeepRef = useRef(0);
  const audioEnabledRef = useRef(true);
  const audioReadyRef = useRef(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [audioReady, setAudioReady] = useState(false);
  const [audioSupported, setAudioSupported] = useState(true);

  useEffect(() => {
    audioEnabledRef.current = audioEnabled;
  }, [audioEnabled]);

  const initializeAudio = useCallback(() => {
    if (audioContextRef.current) {
      audioReadyRef.current = true;
      setAudioReady(true);
      return true;
    }

    const AudioContextConstructor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextConstructor) {
      audioReadyRef.current = false;
      setAudioReady(false);
      setAudioSupported(false);
      return false;
    }

    audioContextRef.current = new AudioContextConstructor();
    audioContextRef.current.resume?.();
    audioReadyRef.current = true;
    setAudioReady(true);
    setAudioSupported(true);
    return true;
  }, []);

  const enableAudio = useCallback(() => {
    const started = initializeAudio();
    if (!started) {
      setAudioSupported(false);
      return false;
    }
    if (audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume();
    }
    setAudioEnabled(true);
    return true;
  }, [initializeAudio]);

  const playBeep = useCallback(() => {
    if (!audioReadyRef.current || !audioEnabledRef.current) return;
    const context = audioContextRef.current;
    if (!context) return;

    const now = context.currentTime;
    if (now - lastBeepRef.current < 0.04) return;
    lastBeepRef.current = now;

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(1600, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.096);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.11);
  }, []);

  const toggleAudio = () => {
    if (!audioReadyRef.current) {
      enableAudio();
      return;
    }
    setAudioEnabled((prev) => !prev);
  };

  return {
    audioEnabled,
    audioReady,
    audioSupported,
    enableAudio,
    playBeep,
    toggleAudio,
  };
};

export default function Home() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const lastTextRef = useRef("");
  const [hasStarted, setHasStarted] = useState(false);
  const typingStartedRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const {
    audioEnabled,
    audioReady,
    audioSupported,
    enableAudio,
    playBeep,
    toggleAudio,
  } = useTypingAudio();
  const shouldType = hasStarted && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldType || !typedRef.current || typingStartedRef.current) return;

    typedRef.current.innerHTML = "";
    lastTextRef.current = "";
    typingStartedRef.current = true;

    const typed = new Typed(typedRef.current, {
      strings: [typedMarkup],
      typeSpeed: 34,
      startDelay: 200,
      contentType: "html",
      showCursor: true,
      smartBackspace: false,
      loop: false,
    });

    const observer = new MutationObserver(() => {
      const currentText = typedRef.current?.textContent ?? "";
      const previousText = lastTextRef.current;

      if (currentText.length > previousText.length) {
        const addedText = currentText.slice(previousText.length);
        for (const char of addedText) {
          if (!char.trim()) continue;
          playBeep();
        }
      }

      lastTextRef.current = currentText;
    });

    observer.observe(typedRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
      typed.destroy();
      lastTextRef.current = "";
      typingStartedRef.current = false;
    };
  }, [shouldType, typedMarkup, playBeep]);

  const handleStart = () => {
    if (hasStarted) return;
    enableAudio();
    setHasStarted(true);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.textBlock}>
          {prefersReducedMotion ? (
            hasStarted ? (
              <div className={styles.typed}>
                {heroLines.flatMap((line, index) => {
                  const elements: JSX.Element[] = [];
                  if (line.type !== "spacer") {
                    const className = heroClassNames[line.type];
                    elements.push(
                      <span key={`${line.type}-${index}`} className={className}>
                        {line.text}
                      </span>,
                    );
                  }
                  if (index < heroLines.length - 1) {
                    elements.push(<br key={`br-${index}`} />);
                  }
                  return elements;
                })}
              </div>
            ) : null
          ) : (
            <>
              <span
                ref={typedRef}
                className={styles.typed}
                aria-hidden="true"
              ></span>
              <p className={styles.srOnly}>{heroPlainText}</p>
            </>
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.startWrap} data-started={hasStarted}>
            <button
              className={styles.startButton}
              type="button"
              onClick={handleStart}
              disabled={hasStarted}
            >
              start the journey
            </button>
          </div>
          <button
            className={styles.soundButton}
            type="button"
            onClick={toggleAudio}
            data-sound-toggle="true"
            data-enabled={audioEnabled}
            aria-pressed={audioEnabled}
            disabled={!audioSupported}
            title={audioSupported ? "Toggle sound" : "Audio not supported"}
          >
            sound {audioEnabled && audioReady ? "on" : "off"}
          </button>
          <nav className={styles.links} aria-label="social links">
            {heroContent.links.map((link) => (
              <a
                key={link.label}
                className={styles.link}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </main>
    </div>
  );
}
