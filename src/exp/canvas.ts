interface GetColorBufferWithImageDataResponse {
  colorBuffer: Uint8ClampedArray<ArrayBufferLike>;
  imageData: ImageData;
}

type RGBA = [number, number, number, number];

export class ExperimentalCanvas {
  constructor(private readonly ctx: CanvasRenderingContext2D) {}

  private getColorBufferWithImageData(): GetColorBufferWithImageDataResponse {
    const { canvas } = this.ctx;
    const imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data: colorBuffer } = imageData;

    return { colorBuffer, imageData };
  }

  public fillRect(x: number, y: number, w: number, h: number, rgba: RGBA) {
    const { colorBuffer, imageData } = this.getColorBufferWithImageData();

    const [r, g, b, a] = rgba;

    for (let currentY = y; currentY < y + h; currentY++) {
      for (let currentX = x; currentX < x + w; currentX++) {
        const pos = currentY * this.ctx.canvas.width * 4 + currentX * 4;

        colorBuffer[pos] = r;
        colorBuffer[pos + 1] = g;
        colorBuffer[pos + 2] = b;
        colorBuffer[pos + 3] = a;
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  public drawGrid(xStep: number, yStep: number, rgba: RGBA) {
    const { colorBuffer, imageData } = this.getColorBufferWithImageData();
    const { canvas } = this.ctx;

    const [r, g, b, a] = rgba;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const pos = y * this.ctx.canvas.width * 4 + x * 4;

        if (x % xStep === 0 || y % yStep === 0) {
          colorBuffer[pos] = r;
          colorBuffer[pos + 1] = g;
          colorBuffer[pos + 2] = b;
          colorBuffer[pos + 3] = a;
        }
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }
}
