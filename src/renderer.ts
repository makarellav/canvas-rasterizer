const X_STEP = 100;
const Y_STEP = 100;

export class Renderer {
  constructor(private readonly ctx: CanvasRenderingContext2D) {}

  public run() {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;

    this.ctx.fillStyle = "black";

    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.strokeStyle = "white";

    this.ctx.beginPath();
    for (let x = X_STEP; x < this.ctx.canvas.width; x += X_STEP) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.ctx.canvas.height);
    }

    for (let y = Y_STEP; y < this.ctx.canvas.height; y += Y_STEP) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.ctx.canvas.width, y);
    }
    this.ctx.stroke();
  }
}
