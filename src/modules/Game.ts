import {Cactus} from './Cactus'
import {Player} from './Player'

export class Game {
  public canvas
  public context
  public gameLoop: (timeStamp: number) => void
  public player: Player
  public groundLevel: number
  public cactus: Cactus
  public gameOver: boolean
  public restartButton: HTMLButtonElement

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, gameLoop: (timeStamp: number) => void) {
    this.restartButton = document.querySelector('.restart') as HTMLButtonElement

    this.canvas = canvas
    this.context = context
    this.groundLevel = 270
    this.player = new Player(this)
    this.cactus = new Cactus(this)
    this.gameOver = false
    this.gameLoop = gameLoop

    this.setEventListeners()
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

  restartGame() {
    this.cactus.positionX = this.cactus.cactusDefaultPosition

    this.gameOver = false
    this.restartButton.classList.remove('visible')

    // retrigger the game loop
    this.gameLoop(0)
  }

  setEventListeners() {
    this.restartButton.addEventListener('click', () => {
      this.restartGame()
    })
  }
}
