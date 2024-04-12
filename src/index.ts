import {Game} from './modules/Game'
import './style.css'

const canvas = document.querySelector('canvas') as HTMLCanvasElement
const context = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = 800
canvas.height = 400

// canvas.style.width = '900px'
// canvas.style.height = '500px'

const game = new Game(canvas, context)

let lastTime = 0

function gameLoop(timeStamp: number) {
  const deltaTime = timeStamp - lastTime
  lastTime = timeStamp

  context?.clearRect(0, 0, canvas.width, canvas.height)

  // Update game logic
  game.update(deltaTime)

  // Draw game objects
  game.draw()

  // Call the game loop again
  requestAnimationFrame(gameLoop)
}

gameLoop(lastTime)
