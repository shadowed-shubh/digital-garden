import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const LorenzBackground: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <>
      <canvas id="lorenz-canvas" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent'
      }}></canvas>
      <div class="lorenz-controls" id="lorenz-controls">
        <div class="controls-handle" id="lorenz-handle"></div>
        <div class="controls-panel">
          <div class="control-group">
            <label>Sigma <span class="value-display" id="sigma-val">10.0</span></label>
            <input type="range" id="sigma-slider" min="5" max="20" step="0.1" value="10" />
          </div>
          <div class="control-group">
            <label>Rho <span class="value-display" id="rho-val">28.0</span></label>
            <input type="range" id="rho-slider" min="10" max="50" step="0.1" value="28" />
          </div>
          <div class="control-group">
            <label>Beta <span class="value-display" id="beta-val">2.67</span></label>
            <input type="range" id="beta-slider" min="1" max="5" step="0.01" value="2.666" />
          </div>
          <div class="control-group">
            <label>Speed <span class="value-display" id="speed-val">1.0</span></label>
            <input type="range" id="speed-slider" min="0.1" max="5" step="0.1" value="1" />
          </div>
        </div>
      </div>
    </>
  )
}

LorenzBackground.afterDOMLoaded = `
(function() {
  const canvas = document.getElementById('lorenz-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const controls = document.getElementById('lorenz-controls');
  const handle = document.getElementById('lorenz-handle');
  
  let width, height;
  let sigma = 10 + Math.random() * 4;
  let rho = 28 + Math.random() * 7;
  let beta = 2.66 + Math.random() * 0.5;
  let x = 0.1, y = 0.1, z = 0.1;
  let dt = 0.015;
  let speedMultiplier = 1.0;
  
  let mouseX = 0.5, mouseY = 0.5;
  let rotation = 0;
  
  const palette = ["#f55cad", "#39161f", "#e4467a", "#e79ba8", "#872e4d"];
  let colorProgress = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    // Initial fill with navy background
    ctx.fillStyle = '#00132f';
    ctx.fillRect(0, 0, width, height);
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  });

  handle?.addEventListener('click', (e) => {
    e.stopPropagation();
    controls?.classList.toggle('active');
  });

  const sliders = {
    sigma: { el: document.getElementById('sigma-slider'), val: document.getElementById('sigma-val') },
    rho: { el: document.getElementById('rho-slider'), val: document.getElementById('rho-val') },
    beta: { el: document.getElementById('beta-slider'), val: document.getElementById('beta-val') },
    speed: { el: document.getElementById('speed-slider'), val: document.getElementById('speed-val') }
  };

  if (sliders.sigma.el) sliders.sigma.el.value = sigma;
  if (sliders.rho.el) sliders.rho.el.value = rho;
  if (sliders.beta.el) sliders.beta.el.value = beta;
  
  Object.keys(sliders).forEach(key => {
    sliders[key].el?.addEventListener('input', (e) => {
      const v = parseFloat(e.target.value);
      if (key === 'sigma') sigma = v;
      if (key === 'rho') rho = v;
      if (key === 'beta') beta = v;
      if (key === 'speed') speedMultiplier = v;
      if (sliders[key].val) sliders[key].val.textContent = v.toFixed(2);
    });
  });

  function lorenz(x, y, z, s, r, b) {
    return {
      dx: s * (y - x),
      dy: x * (r - z) - y,
      dz: x * y - b * z
    };
  }

  function rk4(x, y, z, dt, s, r, b) {
    const k1 = lorenz(x, y, z, s, r, b);
    const k2 = lorenz(x + k1.dx * dt/2, y + k1.dy * dt/2, z + k1.dz * dt/2, s, r, b);
    const k3 = lorenz(x + k2.dx * dt/2, y + k2.dy * dt/2, z + k2.dz * dt/2, s, r, b);
    const k4 = lorenz(x + k3.dx * dt, y + k3.dy * dt, z + k3.dz * dt, s, r, b);

    return {
      x: x + (dt/6) * (k1.dx + 2*k2.dx + 2*k3.dx + k4.dx),
      y: y + (dt/6) * (k1.dy + 2*k2.dy + 2*k3.dy + k4.dy),
      z: z + (dt/6) * (k1.dz + 2*k2.dz + 2*k3.dz + k4.dz)
    };
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  function interpolateColor(colors, progress) {
    const total = colors.length - 1;
    const pos = progress * total;
    const index = Math.floor(pos);
    const t = pos - index;
    
    const c1 = hexToRgb(colors[index]);
    const c2 = hexToRgb(colors[Math.min(index + 1, total)]);
    
    return \`rgb(\${Math.round(lerp(c1.r, c2.r, t))}, \${Math.round(lerp(c1.g, c2.g, t))}, \${Math.round(lerp(c1.b, c2.b, t))})\`;
  }

  function animate() {
    // Reset shadow properties to prevent background fill from glowing and shifting color
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';

    // Fading trails back to navy #00132f
    ctx.fillStyle = 'rgba(0, 19, 47, 0.008)';
    ctx.fillRect(0, 0, width, height);

    rotation += 0.003;
    const steps = Math.ceil(2 * speedMultiplier); // Elegant thin strands
    const innerDt = dt * speedMultiplier;

    const rhoEff = rho + (mouseY - 0.5) * 8;
    const sigmaEff = sigma + (mouseX - 0.5) * 4;

    for (let i = 0; i < steps; i++) {
      const prevX = x, prevY = y, prevZ = z;
      const next = rk4(x, y, z, innerDt, sigmaEff, rhoEff, beta);
      x = next.x; y = next.y; z = next.z;

      // Centered rotation on x-y horizontal plane, vertical projection on centered z axis
      const project = (px, py, pz) => {
        const rx = px * Math.cos(rotation) - py * Math.sin(rotation);
        const scale = Math.min(width, height) / 50;
        return {
          cx: width / 2 + rx * scale,
          cy: height / 2 - (pz - 25) * scale
        };
      };

      const p1 = project(prevX, prevY, prevZ);
      const p2 = project(x, y, z);

      colorProgress = (colorProgress + 0.0005) % 1;
      const color = interpolateColor(palette, colorProgress);

      ctx.beginPath();
      ctx.moveTo(p1.cx, p1.cy);
      ctx.lineTo(p2.cx, p2.cy);
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5; // Elegant thin stroke
      ctx.shadowBlur = 6;  // Subtle glowing halo
      ctx.shadowColor = color;
      ctx.stroke();
    }

    requestAnimationFrame(animate);
  }

  animate();
})();
`

export default (() => LorenzBackground) satisfies QuartzComponentConstructor


