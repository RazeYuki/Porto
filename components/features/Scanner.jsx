'use client';

import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import './Scanner.css';

const hexToRgb = (hex) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match ? [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255] : [1, 1, 1];
};

const directionToFloat = (direction) => (direction === 'horizontal' ? 1 : direction === 'diagonal' ? 2 : 0);

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution, uMouse;
uniform float iTime, uSpeed, uSweepSpeed, uSweepWidth, uSweepFalloff, uScale, uFrequency, uRipple;
uniform float uBandDensity, uLineSharpness, uGlow, uColorSpread, uBrightness, uContrast, uSoftness, uVignette;
uniform float uOpacity, uScanline, uGrain, uGrainIntensity, uDirection, uMouseEnabled, uMouseRadius, uMouseStrength, uMouseActive;
uniform vec3 uColor1, uColor2, uColor3;
out vec4 fragColor;
const float TAU = 6.2831853;

float signalField(vec2 point, float time) {
  float wave = sin(point.x * 1.3 + time * 0.7);
  wave += sin(point.y * 1.7 - time * 0.52) * 0.8;
  wave += sin((point.x + point.y) * 0.9 + time * 0.91) * 0.6;
  wave += sin((point.x - point.y) * 1.53 - time * 0.63) * 0.42;
  return wave * 0.35;
}

vec3 palette(float signal) {
  signal = pow(clamp(signal, 0.0, 1.0), uContrast);
  return mix(mix(uColor1, uColor2, smoothstep(0.08, 0.6, signal)), uColor3, smoothstep(0.68, 1.0, signal));
}

float scanBand(float value, float antiAlias, float sharpness) {
  return pow(mix(0.5, 0.5 + 0.5 * cos(value * TAU), antiAlias), sharpness);
}

void main() {
  float aspect = iResolution.x / iResolution.y;
  vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
  vec2 point = uv / max(uScale, 0.001);
  float time = iTime * uSpeed;
  float mouseBoost = 0.0;
  if (uMouseEnabled > 0.5) {
    vec2 mouse = vec2((uMouse.x * 2.0 - 1.0) * aspect, uMouse.y * 2.0 - 1.0);
    float radius = max(uMouseRadius, 0.001);
    mouseBoost = exp(-dot(uv - mouse, uv - mouse) / (radius * radius)) * uMouseStrength * uMouseActive;
  }
  float axis = uDirection < 0.5 ? point.y : (uDirection < 1.5 ? point.x : (point.x + point.y) * 0.70710678);
  float signal = signalField(point * uFrequency, time);
  float coordinate = axis + signal * uRipple;
  float sweep = pow(0.5 + 0.5 * cos((coordinate / max(uSweepWidth, 0.05) - time * uSweepSpeed) * TAU), max(uSweepFalloff, 0.1));
  float lineCoordinate = coordinate * uBandDensity;
  float antiAlias = clamp(1.0 / (1.0 + uSoftness * fwidth(lineCoordinate) * 3.0) * (1.0 + mouseBoost * 0.6), 0.0, 1.0);
  float body = pow(clamp(0.5 + 0.5 * signal, 0.0, 1.0), 2.0) * uGlow * sweep;
  float split = uColorSpread * 0.16;
  float sharpness = max(uLineSharpness, 0.1);
  float red = clamp(scanBand(lineCoordinate + split, antiAlias, sharpness) * sweep + body, 0.0, 1.0);
  float green = clamp(scanBand(lineCoordinate, antiAlias, sharpness) * sweep + body, 0.0, 1.0);
  float blue = clamp(scanBand(lineCoordinate - split, antiAlias, sharpness) * sweep + body, 0.0, 1.0);
  vec3 color = vec3(palette(red).r, palette(green).g, palette(blue).b);
  float intensity = (red + green + blue) / 3.0 * uBrightness * (1.0 + mouseBoost * 0.9);
  if (uScanline > 0.5) intensity *= 1.0 - 0.18 * (0.5 + 0.5 * cos(gl_FragCoord.y * 1.7));
  if (uGrain > 0.5) intensity += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
  intensity *= clamp(1.0 - uVignette * smoothstep(0.55, 1.65, length(uv)), 0.0, 1.0);
  float alpha = clamp(intensity, 0.0, 1.0) * uOpacity;
  fragColor = vec4(clamp(color, 0.0, 1.0) * alpha, alpha);
}
`;

export default function Scanner({
  color1 = '#5227FF', color2 = '#FF9FFC', color3 = '#FFFFFF', speed = 0.5, sweepSpeed = 0.25,
  sweepWidth = 1.6, sweepFalloff = 6, scale = 1.5, frequency = 2, ripple = 0.22, bandDensity = 11,
  lineSharpness = 5.5, glow = 0.22, scanDirection = 'vertical', colorSpread = 0.7, brightness = 1,
  contrast = 1.15, softness = 1.4, vignette = 0.45, scanline = true, grain = true, grainIntensity = 0.05,
  opacity = 1, mouseInteraction = true, mouseRadius = 0.5, mouseStrength = 0.5, className = '',
}) {
  const containerRef = useRef(null);
  const programRef = useRef(null);
  const initialPropsRef = useRef({ color1, color2, color3, speed, sweepSpeed, sweepWidth, sweepFalloff, scale, frequency, ripple, bandDensity, lineSharpness, glow, scanDirection, colorSpread, brightness, contrast, softness, vignette, scanline, grain, grainIntensity, opacity, mouseInteraction, mouseRadius, mouseStrength });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const props = initialPropsRef.current;
    const renderer = new Renderer({ webgl: 2, alpha: true, premultipliedAlpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    canvas.style.cssText = 'width:100%;height:100%;display:block;';
    container.appendChild(canvas);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 }, iResolution: { value: new Float32Array([1, 1]) },
        uSpeed: { value: props.speed }, uSweepSpeed: { value: props.sweepSpeed }, uSweepWidth: { value: props.sweepWidth }, uSweepFalloff: { value: props.sweepFalloff },
        uScale: { value: props.scale }, uFrequency: { value: props.frequency }, uRipple: { value: props.ripple }, uBandDensity: { value: props.bandDensity }, uLineSharpness: { value: props.lineSharpness },
        uGlow: { value: props.glow }, uColorSpread: { value: props.colorSpread }, uBrightness: { value: props.brightness }, uContrast: { value: props.contrast }, uSoftness: { value: props.softness },
        uVignette: { value: props.vignette }, uOpacity: { value: props.opacity }, uScanline: { value: props.scanline ? 1 : 0 }, uGrain: { value: props.grain ? 1 : 0 }, uGrainIntensity: { value: props.grainIntensity },
        uDirection: { value: directionToFloat(props.scanDirection) }, uMouse: { value: new Float32Array([0.5, 0.5]) }, uMouseEnabled: { value: props.mouseInteraction ? 1 : 0 }, uMouseRadius: { value: props.mouseRadius },
        uMouseStrength: { value: props.mouseStrength }, uMouseActive: { value: 0 }, uColor1: { value: new Float32Array(hexToRgb(props.color1)) }, uColor2: { value: new Float32Array(hexToRgb(props.color2)) }, uColor3: { value: new Float32Array(hexToRgb(props.color3)) },
      },
    });
    programRef.current = program;
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const resize = () => {
      const bounds = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, Math.floor(bounds.width)), Math.max(1, Math.floor(bounds.height)));
      program.uniforms.iResolution.value.set([gl.drawingBufferWidth, gl.drawingBufferHeight]);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();
    const targetMouse = [0.5, 0.5];
    const currentMouse = [0.5, 0.5];
    let targetMouseActive = 0;
    let mouseActive = 0;
    const onMouseMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      targetMouse[0] = (event.clientX - bounds.left) / bounds.width;
      targetMouse[1] = 1 - (event.clientY - bounds.top) / bounds.height;
      targetMouseActive = 1;
    };
    const onMouseLeave = () => { targetMouseActive = 0; };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    let frame = 0;
    let inView = true;
    let pageVisible = !document.hidden;
    const startedAt = performance.now();
    const render = (time) => {
      program.uniforms.iTime.value = (time - startedAt) / 1000;
      currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.05;
      currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.05;
      mouseActive += (targetMouseActive - mouseActive) * 0.05;
      program.uniforms.uMouse.value.set(currentMouse);
      program.uniforms.uMouseActive.value = mouseActive;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(render);
    };
    const start = () => { if (inView && pageVisible && !frame) frame = requestAnimationFrame(render); };
    const stop = () => { if (frame) { cancelAnimationFrame(frame); frame = 0; } };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; inView ? start() : stop(); });
    const onVisibilityChange = () => { pageVisible = !document.hidden; pageVisible ? start() : stop(); };
    observer.observe(container);
    document.addEventListener('visibilitychange', onVisibilityChange);
    start();
    return () => {
      stop(); resizeObserver.disconnect(); observer.disconnect(); document.removeEventListener('visibilitychange', onVisibilityChange);
      canvas.removeEventListener('mousemove', onMouseMove); canvas.removeEventListener('mouseleave', onMouseLeave);
      programRef.current = null; canvas.remove(); gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  useEffect(() => {
    const u = programRef.current?.uniforms;
    if (!u) return;
    u.uSpeed.value = speed; u.uSweepSpeed.value = sweepSpeed; u.uSweepWidth.value = sweepWidth; u.uSweepFalloff.value = sweepFalloff;
    u.uScale.value = scale; u.uFrequency.value = frequency; u.uRipple.value = ripple; u.uBandDensity.value = bandDensity;
    u.uLineSharpness.value = lineSharpness; u.uGlow.value = glow; u.uColorSpread.value = colorSpread; u.uBrightness.value = brightness;
    u.uContrast.value = contrast; u.uSoftness.value = softness; u.uVignette.value = vignette; u.uOpacity.value = opacity;
    u.uScanline.value = scanline ? 1 : 0; u.uGrain.value = grain ? 1 : 0; u.uGrainIntensity.value = grainIntensity;
    u.uDirection.value = directionToFloat(scanDirection); u.uMouseEnabled.value = mouseInteraction ? 1 : 0; u.uMouseRadius.value = mouseRadius; u.uMouseStrength.value = mouseStrength;
    [color1, color2, color3].forEach((color, index) => u[`uColor${index + 1}`].value.set(hexToRgb(color)));
  }, [color1, color2, color3, speed, sweepSpeed, sweepWidth, sweepFalloff, scale, frequency, ripple, bandDensity, lineSharpness, glow, scanDirection, colorSpread, brightness, contrast, softness, vignette, scanline, grain, grainIntensity, opacity, mouseInteraction, mouseRadius, mouseStrength]);

  return <div ref={containerRef} className={`scanner-container ${className}`.trim()} />;
}
