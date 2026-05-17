
"use client";

import React, { useEffect, useRef } from 'react';

/**
 * @fileOverview Custom-engineered Neural Fluid Shader (WebGL).
 * Replaces external shader dependencies for maximum stability and performance.
 */

export function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;

      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float n = i.x + i.y * 57.0 + i.z * 113.0;
        return mix(mix(mix( sin(n), sin(n+1.0), f.x),
                       mix( sin(n+57.0), sin(n+58.0), f.x), f.y),
                   mix(mix( sin(n+113.0), sin(n+114.0), f.x),
                       mix( sin(n+170.0), sin(n+171.0), f.x), f.y), f.z);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        float t = iTime * 0.15;
        
        vec3 color1 = vec3(0.02, 0.02, 0.04); // Deep Midnight
        vec3 color2 = vec3(0.86, 1.0, 0.0);   // Bloom Accent (#DCFF00)
        vec3 color3 = vec3(0.2, 0.0, 0.4);   // Deep Neural Violet
        
        float n = noise(vec3(uv * 2.5, t));
        n += 0.5 * noise(vec3(uv * 5.0, t * 1.2));
        
        vec3 finalColor = mix(color1, color2, clamp(n, 0.0, 1.0) * 0.1);
        finalColor = mix(finalColor, color3, clamp(sin(t + uv.x * 1.5), 0.0, 1.0) * 0.05);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const loadShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const shaderProgram = gl.createProgram()!;
    gl.attachShader(shaderProgram, loadShader(gl, gl.VERTEX_SHADER, vsSource));
    gl.attachShader(shaderProgram, loadShader(gl, gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(shaderProgram, 'iResolution');
    const timeLocation = gl.getUniformLocation(shaderProgram, 'iTime');

    const render = (time: number) => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none opacity-60" 
    />
  );
}
