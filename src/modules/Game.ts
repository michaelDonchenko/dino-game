import {Cactus} from './Cactus'
import {Player} from './Player'

export class Game {
  public canvas
  public context
  public player: Player
  public groundLevel: number
  public cactus: Cactus

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.context = context
    this.groundLevel = 270
    this.player = new Player(this)
    this.cactus = new Cactus(this)
  }

  update(deltaTime: number) {
    this.player.update(deltaTime)
    this.cactus.update()
  }

  draw() {
    this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height)

    this.context.strokeStyle = 'gray'
    this.context.moveTo(0, this.groundLevel)
    this.context.lineTo(this.canvas.width, this.groundLevel)
    this.context.stroke()

    this.player.draw(this.context)
    this.cactus.draw(this.context)
  }
}
