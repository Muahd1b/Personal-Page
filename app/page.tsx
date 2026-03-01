"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Typed from "typed.js";
import styles from "./page.module.css";
import { heroContent, heroPlainText } from "./content";

type LineType = "intro" | "line" | "sectionTitle" | "bullet" | "meta" | "spacer";
type RenderLineType = Exclude<LineType, "spacer">;
type LoaderPhase = "loading" | "exiting" | "done";

type Line = {
  type: LineType;
  text?: string;
};

const makeLine = (type: LineType, text?: string): Line => ({ type, text });

const heroLines: Line[] = [
  makeLine("intro", heroContent.intro),
  ...heroContent.lead.map((line) => makeLine("line", line)),
];

heroContent.sections.forEach((section) => {
  heroLines.push(makeLine("spacer"));
  heroLines.push(makeLine("sectionTitle", section.title));
  section.items.forEach((item) => {
    heroLines.push(makeLine("bullet", `- ${item}`));
  });
});

heroLines.push(makeLine("spacer"));
heroLines.push(makeLine("meta", heroContent.meta));

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
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const lastTextRef = useRef("");
  const [hasStarted, setHasStarted] = useState(false);
  const typingStartedRef = useRef(false);
  const progressRef = useRef(0);
  const [loaderPhase, setLoaderPhase] = useState<LoaderPhase>("loading");
  const [displayProgress, setDisplayProgress] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const {
    audioEnabled,
    audioReady,
    audioSupported,
    enableAudio,
    playBeep,
    toggleAudio,
  } = useTypingAudio();
  const loaderDone = loaderPhase === "done";
  const loaderDoneRef = useRef(loaderDone);
  const shouldType = loaderDone && hasStarted && !prefersReducedMotion;

  useEffect(() => {
    loaderDoneRef.current = loaderDone;
  }, [loaderDone]);

  useEffect(() => {
    if (loaderPhase !== "loading") return;

    const MIN_DURATION = prefersReducedMotion ? 480 : 1100;
    const SOFT_DURATION = prefersReducedMotion ? 900 : 2600;
    const HARD_TIMEOUT = 8000;
    const startedAt = performance.now();
    let raf = 0;
    let hardTimeout = 0;
    let cancelled = false;
    let transitioning = false;
    let onReady: (() => void) | null = null;
    const completion = {
      dom: false,
      fonts: false,
      grid: false,
      min: false,
    };
    const weights = {
      dom: 20,
      fonts: 25,
      grid: 35,
      min: 20,
    } as const;

    const mark = (task: keyof typeof completion) => {
      completion[task] = true;
    };

    if (document.readyState === "complete" || document.readyState === "interactive") {
      mark("dom");
    } else {
      onReady = () => {
        mark("dom");
        if (onReady) {
          window.removeEventListener("DOMContentLoaded", onReady);
          onReady = null;
        }
      };
      window.addEventListener("DOMContentLoaded", onReady);
    }

    if ("fonts" in document && document.fonts?.ready) {
      document.fonts.ready
        .then(() => mark("fonts"))
        .catch(() => mark("fonts"));
    } else {
      mark("fonts");
    }

    const gridImage = new Image();
    gridImage.decoding = "async";
    gridImage.src = "/oceanx-grid.png";
    gridImage.onload = () => mark("grid");
    gridImage.onerror = () => mark("grid");

    const computeRealProgress = () => {
      let value = 0;
      if (completion.dom) value += weights.dom;
      if (completion.fonts) value += weights.fonts;
      if (completion.grid) value += weights.grid;
      if (completion.min) value += weights.min;
      return value;
    };

    const isFullyReady = () =>
      completion.dom && completion.fonts && completion.grid && completion.min;

    const renderProgress = () => {
      if (cancelled) return;

      const elapsed = performance.now() - startedAt;
      if (elapsed >= MIN_DURATION) mark("min");
      const syntheticProgress = Math.min(95, (elapsed / SOFT_DURATION) * 95);
      const realProgress = computeRealProgress();
      const ready = isFullyReady();
      const target = ready ? 100 : Math.max(realProgress, syntheticProgress);

      setDisplayProgress((previous) => {
        const easing = ready ? 0.22 : 0.1;
        let next = previous + (target - previous) * easing;
        if (Math.abs(next - target) < 0.18) next = target;
        next = Math.min(100, Math.max(0, next));
        progressRef.current = next;
        return next;
      });

      if (!transitioning && ready && progressRef.current >= 99.4) {
        transitioning = true;
        setLoaderPhase("exiting");
        return;
      }

      raf = window.requestAnimationFrame(renderProgress);
    };

    hardTimeout = window.setTimeout(() => {
      completion.dom = true;
      completion.fonts = true;
      completion.grid = true;
      completion.min = true;
    }, HARD_TIMEOUT);

    raf = window.requestAnimationFrame(renderProgress);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      window.clearTimeout(hardTimeout);
      if (onReady) window.removeEventListener("DOMContentLoaded", onReady);
      gridImage.onload = null;
      gridImage.onerror = null;
    };
  }, [loaderPhase, prefersReducedMotion]);

  useEffect(() => {
    if (loaderPhase !== "exiting") return;
    const timer = window.setTimeout(
      () => setLoaderPhase("done"),
      prefersReducedMotion ? 220 : 650,
    );
    return () => window.clearTimeout(timer);
  }, [loaderPhase, prefersReducedMotion]);

  useEffect(() => {
    const canvas = backgroundCanvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: true,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const vertexShaderSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 vUv;

      uniform vec2 uResolution;
      uniform sampler2D uGridTex;
      uniform sampler2D uTrailTex;
      uniform float uGridSize;
      uniform vec2 uCenterFadeThreshold;
      uniform float uTrailStrength;
      uniform float uGlowStrength;
      uniform float uAtmosphereStrength;
      uniform float uGridBaseStrength;

      void main() {
        vec2 uv = vUv;
        float aspect = uResolution.x / uResolution.y;

        vec3 base = vec3(0.005, 0.012, 0.028);
        base += vec3(0.010, 0.028, 0.060) * (1.0 - uv.x * 0.72);
        float atmo = pow(max(0.0, 1.0 - distance(uv, vec2(0.12, 0.24)) * 1.35), 2.0);
        base += vec3(0.010, 0.024, 0.050) * atmo * uAtmosphereStrength;

        vec2 circleOrigin = uv - vec2(0.5);
        circleOrigin.x *= aspect;
        float dist = distance(circleOrigin, vec2(0.0));
        float centerFade = smoothstep(uCenterFadeThreshold.x, uCenterFadeThreshold.y, dist);

        vec2 aspectUv = vec2(uv.x * aspect, uv.y);
        float grid = texture2D(uGridTex, aspectUv * uGridSize).a;
        float trail = texture2D(uTrailTex, uv).b;
        float radialEnvelope = mix(0.72, 1.0, centerFade);

        vec3 color = base;
        float baseGrid = pow(grid, 1.6) * uGridBaseStrength;
        float baseBoost = grid * radialEnvelope * 2.5;
        float trailBoost = grid * radialEnvelope * (trail * uTrailStrength * uGlowStrength);

        color += vec3(0.020, 0.055, 0.115) * baseGrid;
        color += pow(max(color, vec3(0.0)), vec3(1.3)) * baseBoost * 0.16;
        color += vec3(0.165, 0.315, 0.500) * trailBoost * 0.30;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "aPosition");
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uGridTex = gl.getUniformLocation(program, "uGridTex");
    const uTrailTex = gl.getUniformLocation(program, "uTrailTex");
    const uGridSize = gl.getUniformLocation(program, "uGridSize");
    const uCenterFadeThreshold = gl.getUniformLocation(program, "uCenterFadeThreshold");
    const uTrailStrength = gl.getUniformLocation(program, "uTrailStrength");
    const uGlowStrength = gl.getUniformLocation(program, "uGlowStrength");
    const uAtmosphereStrength = gl.getUniformLocation(program, "uAtmosphereStrength");
    const uGridBaseStrength = gl.getUniformLocation(program, "uGridBaseStrength");

    const gridTexture = gl.createTexture();
    const trailTexture = gl.createTexture();
    if (!gridTexture || !trailTexture) return;

    const trailCanvas = document.createElement("canvas");
    const trailContext = trailCanvas.getContext("2d");
    if (!trailContext) return;

    const pointer = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
      tx: window.innerWidth * 0.5,
      ty: window.innerHeight * 0.5,
      px: window.innerWidth * 0.5,
      py: window.innerHeight * 0.5,
      vx: 0,
      vy: 0,
      speed: 0,
    };

    let glowStrength = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let gridReady = false;
    let touchActive = false;

    const gridImage = new Image();
    const gridPotCanvas = document.createElement("canvas");
    gridPotCanvas.width = 1024;
    gridPotCanvas.height = 1024;
    const gridPotContext = gridPotCanvas.getContext("2d");
    if (!gridPotContext) return;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);

      trailCanvas.width = Math.max(256, Math.floor(width * 0.5));
      trailCanvas.height = Math.max(256, Math.floor(height * 0.5));
      trailContext.fillStyle = "rgb(0, 0, 0)";
      trailContext.fillRect(0, 0, trailCanvas.width, trailCanvas.height);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.tx = event.clientX;
      pointer.ty = event.clientY;
    };

    const updateTrail = (interactionStrength: number) => {
      const fadeAlpha = prefersReduced ? 0.13 : 0.07;
      trailContext.globalCompositeOperation = "source-over";
      trailContext.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
      trailContext.fillRect(0, 0, trailCanvas.width, trailCanvas.height);

      if (!loaderDoneRef.current || prefersReduced || interactionStrength < 0.015) {
        return;
      }

      const px = (pointer.x / width) * trailCanvas.width;
      const py = (1 - pointer.y / height) * trailCanvas.height;
      const radius = 14 + interactionStrength * 54;
      const gradient = trailContext.createRadialGradient(px, py, 0, px, py, radius);
      gradient.addColorStop(
        0,
        `rgba(48, 96, 255, ${0.18 + interactionStrength * 0.37})`,
      );
      gradient.addColorStop(
        0.45,
        `rgba(32, 72, 200, ${0.13 + interactionStrength * 0.15})`,
      );
      gradient.addColorStop(1, "rgba(8, 16, 60, 0)");
      trailContext.globalCompositeOperation = "lighter";
      trailContext.fillStyle = gradient;
      trailContext.fillRect(px - radius, py - radius, radius * 2, radius * 2);
    };

    const setTouchPointer = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      pointer.tx = touch.clientX;
      pointer.ty = touch.clientY;
    };

    const onTouchStart = (event: TouchEvent) => {
      touchActive = true;
      setTouchPointer(event);
    };

    const onTouchMove = (event: TouchEvent) => {
      touchActive = true;
      setTouchPointer(event);
    };

    const onTouchEnd = () => {
      touchActive = false;
    };

    const render = () => {
      const dx = pointer.tx - pointer.px;
      const dy = pointer.ty - pointer.py;
      pointer.px = pointer.tx;
      pointer.py = pointer.ty;
      pointer.vx = dx;
      pointer.vy = dy;
      pointer.x = pointer.tx;
      pointer.y = pointer.ty;
      pointer.speed = Math.min(
        Math.sqrt(pointer.vx * pointer.vx + pointer.vy * pointer.vy) / 42,
        1,
      );
      const interactionStrength = touchActive
        ? Math.max(pointer.speed, 0.055)
        : pointer.speed;
      const activeInteractionStrength = loaderDoneRef.current
        ? interactionStrength
        : 0;
      glowStrength = glowStrength * 0.92 + activeInteractionStrength * 0.42;

      updateTrail(activeInteractionStrength);

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uResolution, width, height);
      gl.uniform1f(uGridSize, width < 900 ? 15 : 15.5);
      gl.uniform2f(uCenterFadeThreshold, 0.4, 0.6);
      gl.uniform1f(uTrailStrength, 7.8);
      gl.uniform1f(uGlowStrength, Math.min(0.9, glowStrength * 1.45));
      gl.uniform1f(uAtmosphereStrength, 1.0);
      gl.uniform1f(uGridBaseStrength, 0.14);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, gridTexture);
      if (gridReady) {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          gridPotCanvas,
        );
      }
      gl.uniform1i(uGridTex, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, trailTexture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        trailCanvas,
      );
      gl.uniform1i(uTrailTex, 1);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = window.requestAnimationFrame(render);
    };

    gl.bindTexture(gl.TEXTURE_2D, gridTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.bindTexture(gl.TEXTURE_2D, trailTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gridImage.src = "/oceanx-grid.png";
    gridImage.onload = () => {
      gridPotContext.clearRect(0, 0, gridPotCanvas.width, gridPotCanvas.height);
      gridPotContext.drawImage(
        gridImage,
        0,
        0,
        gridPotCanvas.width,
        gridPotCanvas.height,
      );
      gridReady = true;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    raf = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      gl.deleteTexture(gridTexture);
      gl.deleteTexture(trailTexture);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gridImage.onload = null;
    };
  }, []);

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
  }, [shouldType, playBeep]);

  const handleStart = () => {
    if (hasStarted || !loaderDone) return;
    enableAudio();
    setHasStarted(true);
  };

  return (
    <div className={styles.page}>
      <canvas
        ref={backgroundCanvasRef}
        className={styles.backgroundCanvas}
        aria-hidden="true"
      />
      <div className={styles.loaderOverlay} data-phase={loaderPhase} aria-hidden={loaderDone}>
        <div className={styles.loaderCenter}>
          <div className={styles.loaderLineTrack} aria-hidden="true">
            <div
              className={styles.loaderLineFill}
              style={{ transform: `scaleY(${displayProgress / 100})` }}
            />
          </div>
        </div>
      </div>
      <main
        className={`${styles.main} ${loaderDone ? styles.mainVisible : styles.mainHidden}`}
        style={{
          opacity: loaderDone ? 1 : 0,
          pointerEvents: loaderDone ? "auto" : "none",
          transform: loaderDone ? "translateY(0)" : "translateY(10px)",
        }}
      >
        <h1 className={styles.srOnly}>Attention is currency</h1>
        <div className={styles.textBlock}>
          {prefersReducedMotion ? (
            hasStarted && loaderDone ? (
              <div className={styles.typed}>
                {heroLines.flatMap((line, index) => {
                  const elements: ReactNode[] = [];
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
              disabled={hasStarted || !loaderDone}
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
