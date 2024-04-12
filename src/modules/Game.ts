export class Game {
  private timer: number
  public canvas
  public context

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.timer = 0
    this.canvas = canvas
    this.context = context
  }

  update(deltaTime: number) {
    // console.log(deltaTime)

    this.timer += deltaTime
    if (this.timer >= 1000) {
      console.log('one second have passed')
      this.timer = 0
    }
  }

  draw() {
    this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
