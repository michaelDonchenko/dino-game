import {Cactus} from './Cactus'
import {Game} from './Game'

export class Player {
  public image: HTMLImageElement
  public frameX: number
  public frameY: number
  public maxRunningFrames: number
  public width: number
  public height: number
  public fps: number
  public frameInterval: number
  public frameTimer: number
  public currentState: 'running' | 'jumping'
  public velocity: number
  public positionX: number
  public positionY: number

  constructor(public game: Game) {
    this.game = game
    this.image = document.getElementById('dino') as HTMLImageElement
    this.frameX = 0
    this.frameY = 0
    this.maxRunningFrames = 1
    this.width = 50
    this.height = 48
    this.fps = 15
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0
    this.currentState = 'running'
    this.velocity = 0
    this.positionX = 50
    this.positionY = this.game.groundLevel - this.height

    this.addJumpingEventListener()
  }

  update(deltaTime: number) {
    this.runningAnimation(deltaTime)

    if (this.currentState === 'jumping') {
      this.velocity += 1
      this.positionY += this.velocity
    }

    if (this.positionY >= this.game.groundLevel - this.height - 2) {
      this.currentState = 'running'
      this.velocity = 0
    }

    if (this.checkCollision(this.game.cactus)) {
      this.game.gameOver = true
      this.game.restartButton.classList.add('visible')
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.positionX,
      this.positionY - 2,
      this.width,
      this.height
    )
  }

  jump() {
    this.currentState = 'jumping'
    this.velocity = -20
    this.frameX = 2
  }

  runningAnimation(deltaTime: number) {
    if (this.currentState === 'running' && this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.frameX < this.maxRunningFrames) {
        this.frameX++
      } else {
        this.frameX = 0
      }
    } else {
      this.frameTimer += deltaTime
    }
  }

  addJumpingEventListener() {
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        if (this.currentState !== 'jumping') {
          this.jump()
        }
      }
    })
  }

  checkCollision(cactus: Cactus) {
    if (
      this.positionX < cactus.positionX + cactus.width &&
      this.positionX + this.width > cactus.positionX &&
      this.positionY < cactus.positionY + cactus.height &&
      this.positionY + this.height > cactus.positionY
    ) {
      return true
    }

    return false
  }
}
