import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
})
export class ContatoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ctaCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private animFrame = 0;
  private t = 0;
  private resizeObserver!: ResizeObserver;

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

    const drawTri = (cx: number, cy: number, r: number, alpha: number, offset: number) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy - r * (1 + 0.02 * Math.sin(this.t + offset)));
      ctx.lineTo(cx + r * 0.866, cy + r * 0.5);
      ctx.lineTo(cx - r * 0.866, cy + r * 0.5);
      ctx.closePath();
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      this.t += 0.005;
      const cx = W / 2, cy = H / 2;
      const base = Math.min(W, H);

      [0.95, 0.65, 0.4].forEach((scale, i) => {
        drawTri(cx, cy, base * scale * 0.45, 0.04 + i * 0.02, i);
      });

      this.animFrame = requestAnimationFrame(loop);
    };
    loop();
  }
}
