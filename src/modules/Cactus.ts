import {Game} from './Game'

export class Cactus {
  public width: number
  public height: number
  public positionX: number
  public positionY: number
  public speed: number
  public image: HTMLImageElement

  constructor(public game: Game) {
    this.game = game
    this.width = 50
    this.height = 96
    this.positionX = this.game.canvas.width + 500
    this.positionY = this.game.groundLevel - this.height
    this.speed = -5
    this.image = document.getElementById('cactus') as HTMLImageElement
  }

  update() {
    this.positionX += this.speed
    this.resetCactus()
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    )
  }

  resetCactus() {
    const randomXOffset = -2000 * Math.random() - this.width

    if (this.positionX < randomXOffset) {
      this.positionX = this.game.canvas.width + 200
      this.speed = Math.random() * -4 - 5
    }
  }
}
