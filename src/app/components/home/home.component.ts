import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface FTri {
  x: number; y: number; z: number;
  vx: number; vy: number;
  anchorX: number; anchorY: number;
  wrapRadius: number;
  size: number;
  nested: boolean;
  rot: number; dRot: number;
  impulseY: number;
  glow: number; targetGlow: number;
  hovered: boolean;
  phaseX: number; phaseY: number;
  freqX: number;  freqY: number;
  ampX: number;   ampY: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroSection') sectionRef!: ElementRef<HTMLElement>;

  private raf = 0;
  private t = 0;
  private ro!: ResizeObserver;
  private W = 0; private H = 0;
  private mouse = { x: -9999, y: -9999 };
  private tris: FTri[] = [];

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      this.W = canvas.width = canvas.offsetWidth;
      this.H = canvas.height = canvas.offsetHeight;
      this.buildTris();
    };
    this.ro = new ResizeObserver(resize);
    this.ro.observe(canvas);
    resize();

    const section = this.sectionRef.nativeElement;
    section.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
    section.addEventListener('mouseleave', () => {
      this.mouse.x = -9999;
      this.mouse.y = -9999;
    });

    const loop = () => {
      ctx.clearRect(0, 0, this.W, this.H);
      this.t += 0.006;
      this.render(ctx);
      this.raf = requestAnimationFrame(loop);
    };
    loop();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.ro?.disconnect();
  }

  private buildTris(): void {
    this.tris = [];
    const defs: Array<{ fx: number; fy: number; sz: number; nested: boolean; z: number; rot: number }> = [
      { fx: 0.80, fy: 0.10, sz: 0.056, nested: false, z:  80, rot: 0.10 },
      { fx: 0.93, fy: 0.20, sz: 0.038, nested: true,  z: -90, rot: 0.40 },
      { fx: 0.72, fy: 0.20, sz: 0.070, nested: true,  z: 110, rot:-0.30 },
      { fx: 0.97, fy: 0.48, sz: 0.045, nested: false, z:-130, rot: 0.20 },
      { fx: 0.44, fy: 0.12, sz: 0.034, nested: true,  z:  60, rot: 0.60 },
      { fx: 0.48, fy: 0.76, sz: 0.058, nested: true,  z: -50, rot:-0.20 },
      { fx: 0.80, fy: 0.80, sz: 0.065, nested: false, z:  90, rot: 0.50 },
      { fx: 0.93, fy: 0.72, sz: 0.040, nested: true,  z:-110, rot:-0.10 },
      { fx: 0.43, fy: 0.58, sz: 0.030, nested: false, z: 150, rot: 0.80 },
      { fx: 0.60, fy: 0.90, sz: 0.036, nested: true,  z: -70, rot: 0.30 },
      { fx: 0.96, fy: 0.90, sz: 0.052, nested: false, z:  40, rot:-0.40 },
      { fx: 0.50, fy: 0.38, sz: 0.026, nested: false, z:-160, rot: 0.90 },
    ];
    const base = Math.min(this.W, this.H);
    for (const d of defs) {
      const ax = this.W * d.fx;
      const ay = this.H * d.fy;
      this.tris.push({
        x: ax, y: ay, z: d.z,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        anchorX: ax, anchorY: ay,
        wrapRadius: 28 + Math.random() * 36,
        size: base * d.sz,
        nested: d.nested,
        rot: d.rot,
        dRot: (Math.random() < 0.5 ? 1 : -1) * (0.004 + Math.random() * 0.008),
        impulseY: 0,
        glow: 0, targetGlow: 0, hovered: false,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        freqX: 0.28 + Math.random() * 0.30,
        freqY: 0.22 + Math.random() * 0.26,
        ampX: 14 + Math.random() * 22,
        ampY: 10 + Math.random() * 18,
      });
    }
  }

  private render(ctx: CanvasRenderingContext2D): void {
    const FOCAL = 650;
    const logoX = this.W * 0.630;
    const logoY = this.H * 0.475;
    const sorted = [...this.tris].sort((a, b) => b.z - a.z);

    for (const tri of sorted) {
      // Always-on rotation
      tri.rot += tri.dRot;

      // Lissajous organic wander around anchor
      tri.phaseX += tri.freqX * 0.012;
      tri.phaseY += tri.freqY * 0.012;
      const wx = tri.anchorX + Math.sin(tri.phaseX) * tri.ampX;
      const wy = tri.anchorY + Math.cos(tri.phaseY) * tri.ampY;
      tri.x += (wx - tri.x) * 0.018;
      tri.y += (wy - tri.y) * 0.018;

      // Bounce impulse physics
      if (tri.impulseY < 0) tri.impulseY += 0.40;
      else tri.impulseY *= 0.82;

      // Perspective projection
      const scale = FOCAL / (FOCAL + tri.z);
      const px = logoX + (tri.x - logoX) * scale;
      const py = logoY + (tri.y - logoY) * scale + tri.impulseY;

      // Mouse hover
      const dx = px - this.mouse.x;
      const dy = py - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const thresh = tri.size * scale * 1.8;
      const wasHovered = tri.hovered;
      tri.hovered = dist < thresh;
      tri.targetGlow = tri.hovered ? 1.0 : 0.0;

      // Jump on hover enter
      if (tri.hovered && !wasHovered) {
        tri.impulseY = -(10 + tri.size * scale * 0.04);
        tri.dRot *= -1.6;
        setTimeout(() => { tri.dRot /= -1.6; }, 600);
      }

      tri.glow += (tri.targetGlow - tri.glow) * 0.08;
      this.drawFTri(ctx, px, py, tri.size * scale, tri.rot, tri.glow, tri.nested, scale);
    }

    this.drawLogo(ctx, logoX, logoY, Math.min(this.W, this.H) * 0.195, this.t);
  }

  private drawFTri(ctx: CanvasRenderingContext2D, cx: number, cy: number,
    r: number, rot: number, glow: number, nested: boolean, depthScale: number): void {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    const baseAlpha = 0.11 + depthScale * 0.24;
    const finalAlpha = Math.min(1, baseAlpha + glow * 0.70);
    if (glow > 0.04) { ctx.shadowColor = 'rgba(255,255,255,0.95)'; ctx.shadowBlur = 20 * glow; }
    this.triPath(ctx, r);
    ctx.strokeStyle = `rgba(255,255,255,${finalAlpha})`;
    ctx.lineWidth = 1.2 + glow * 1.8;
    ctx.stroke();
    if (nested) {
      this.triPath(ctx, r * 0.58);
      ctx.strokeStyle = `rgba(255,255,255,${finalAlpha * 0.60})`;
      ctx.lineWidth = 0.8 + glow * 1.1;
      ctx.shadowBlur = glow > 0.04 ? 10 * glow : 0;
      ctx.stroke();
    }
    ctx.restore();
  }

  private drawLogo(ctx: CanvasRenderingContext2D, cx: number, cy: number,
    maxR: number, t: number): void {
    ctx.save();
    ctx.translate(cx, cy);
    const breath = 1 + Math.sin(t * 1.05) * 0.013;
    ctx.scale(breath, breath);
    ctx.transform(1, Math.sin(t * 0.38) * 0.022, 0, 1, 0, 0);
    const layers = 5;
    for (let i = 0; i < layers; i++) {
      const r = maxR * (1.0 - i * 0.167);
      const beat = 0.5 + Math.sin(t * 1.35 + i * 0.65) * 0.5;
      ctx.save();
      const glowA = i < 2 ? 0.38 + beat * 0.28 : 0.22 + beat * 0.16;
      ctx.shadowColor = i < 2 ? `rgba(195,215,255,${glowA})` : `rgba(255,255,255,${glowA * 0.8})`;
      ctx.shadowBlur = 8 + beat * 14 + (layers - i) * 1.8;
      const grad = ctx.createLinearGradient(-r * 0.4, -r, r * 0.4, r);
      const alpha = Math.max(0.55, 0.90 - i * 0.06);
      if (i === 0) {
        grad.addColorStop(0,    `rgba(255,255,255,${alpha})`);
        grad.addColorStop(0.38, `rgba(235,240,255,${alpha * 0.95})`);
        grad.addColorStop(0.75, `rgba(210,220,255,${alpha * 0.88})`);
        grad.addColorStop(1,    `rgba(175,192,255,${alpha * 0.78 + beat * 0.08})`);
      } else if (i === 1) {
        grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
        grad.addColorStop(1, `rgba(205,218,255,${alpha * 0.85})`);
      } else {
        const a2 = alpha - i * 0.02;
        grad.addColorStop(0, `rgba(255,255,255,${a2})`);
        grad.addColorStop(1, `rgba(200,212,245,${a2 * 0.82})`);
      }
      const lw = Math.max(0.7, maxR * 0.030 * (1 - i * 0.055));
      this.triPath(ctx, r);
      ctx.strokeStyle = grad;
      ctx.lineWidth = lw;
      ctx.stroke();
      if (i < 4) {
        this.triPath(ctx, r * 0.905);
        ctx.strokeStyle = `rgba(255,255,255,${0.07 + beat * 0.04})`;
        ctx.lineWidth = lw * 0.28;
        ctx.shadowBlur = 3;
        ctx.stroke();
      }
      ctx.restore();
    }
    ctx.restore();
  }

  private triPath(ctx: CanvasRenderingContext2D, r: number): void {
    ctx.beginPath();
    for (let v = 0; v < 3; v++) {
      const a = (v / 3) * Math.PI * 2 - Math.PI / 2;
      v === 0 ? ctx.moveTo(r * Math.cos(a), r * Math.sin(a)) : ctx.lineTo(r * Math.cos(a), r * Math.sin(a));
    }
    ctx.closePath();
  }
}