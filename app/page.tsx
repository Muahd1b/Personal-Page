"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Typed from "typed.js";
import styles from "./page.module.css";
import { heroContent, heroPlainText } from "./content";

type LineType = "intro" | "line" | "sectionTitle" | "bullet" | "meta" | "spacer";
type RenderLineType = Exclude<LineType, "spacer">;

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

    const updateTrail = () => {
      const fadeAlpha = prefersReduced ? 0.13 : 0.07;
      trailContext.globalCompositeOperation = "source-over";
      trailContext.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
      trailContext.fillRect(0, 0, trailCanvas.width, trailCanvas.height);

      if (prefersReduced || pointer.speed < 0.015) return;

      const px = (pointer.x / width) * trailCanvas.width;
      const py = (1 - pointer.y / height) * trailCanvas.height;
      const radius = 14 + pointer.speed * 54;
      const gradient = trailContext.createRadialGradient(px, py, 0, px, py, radius);
      gradient.addColorStop(0, `rgba(48, 96, 255, ${0.19 + pointer.speed * 0.40})`);
      gradient.addColorStop(0.45, `rgba(32, 72, 200, ${0.14 + pointer.speed * 0.16})`);
      gradient.addColorStop(1, "rgba(8, 16, 60, 0)");
      trailContext.globalCompositeOperation = "lighter";
      trailContext.fillStyle = gradient;
      trailContext.fillRect(px - radius, py - radius, radius * 2, radius * 2);
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
      glowStrength = glowStrength * 0.92 + pointer.speed * 0.42;

      updateTrail();

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uResolution, width, height);
      gl.uniform1f(uGridSize, width < 900 ? 15 : 15.5);
      gl.uniform2f(uCenterFadeThreshold, 0.4, 0.6);
      gl.uniform1f(uTrailStrength, 8.2);
      gl.uniform1f(uGlowStrength, Math.min(0.95, glowStrength * 1.55));
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
    raf = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
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
    if (hasStarted) return;
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
      <main className={styles.main}>
        <div className={styles.textBlock}>
          {prefersReducedMotion ? (
            hasStarted ? (
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
