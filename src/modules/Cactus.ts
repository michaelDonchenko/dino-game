import {Game} from './Game'

export class Cactus {
  public cactusDefaultPosition: number
  public width: number
  public height: number
  public positionX: number
  public positionY: number
  public speed: number
  public image: HTMLImageElement

  constructor(public game: Game) {
    this.game = game
    this.cactusDefaultPosition = this.game.canvas.width + 500
    this.width = 50
    this.height = 96
    this.positionX = this.cactusDefaultPosition
    this.positionY = this.game.groundLevel - this.height + 2
    this.speed = -5
    this.image = document.getElementById('cactus') as HTMLImageElement
  }

  update() {
    this.positionX += this.speed
    this.resetCondition()
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

  resetCondition() {
    const randomXOffset = -2000 * Math.random() - this.width

    if (this.positionX < randomXOffset) {
      this.positionX = this.game.canvas.width + 200
      this.speed = Math.random() * -4 - 5
    }
  }
}
