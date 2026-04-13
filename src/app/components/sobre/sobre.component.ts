import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Stat {
  valor: string;
  label: string;
}

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss'],
})
export class SobreComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sobreCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private animFrame = 0;
  private t = 0;
  private resizeObserver!: ResizeObserver;

  stats: Stat[] = [
    { valor: '40+', label: 'Projetos entregues'  },
    { valor: '98%', label: 'Clientes satisfeitos' },
    { valor: '5+',  label: 'Anos de mercado'      },
    { valor: '24h', label: 'Tempo de resposta'    },
  ];

  ngAfterViewInit(): void {
    this.initCanvas();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrame);
    this.resizeObserver?.disconnect();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    this.resizeObserver = new ResizeObserver(resize);
    this.resizeObserver.observe(canvas);
    resize();

    const drawTri = (cx: number, cy: number, r: number, rot: number, alpha: number) => {
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const angle = rot + (i / 3) * Math.PI * 2 - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      this.t += 0.008;
      const cx = W / 2, cy = H / 2;
      const base = Math.min(W, H);

      [0.85, 0.58, 0.34].forEach((scale, i) => {
        const r   = base * scale * 0.45;
        const rot = this.t * (i % 2 === 0 ? 1 : -1) * 0.3;
        const a   = 0.06 + 0.04 * Math.sin(this.t + i);
        drawTri(cx, cy, r, rot, a);
      });

      this.animFrame = requestAnimationFrame(loop);
    };
    loop();
  }
}
