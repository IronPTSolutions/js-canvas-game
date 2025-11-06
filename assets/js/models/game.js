
class Game {

  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = CANVAS_W;
    this.canvas.height = CANVAS_H;
    this.ctx = this.canvas.getContext('2d');

    this.fps = FPS;
    this.drawIntervalId = undefined;

    this.background = new Background(this.ctx, BG_MAIN);
    this.mario = new Mario(this.ctx, 50, 0);
    this.mario.groundTo(this.canvas.height - GROUND_Y);

    this.setupListeners();
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
      }, this.fps);
    }
  }

  setupListeners() {
    addEventListener('keydown', (event) => this.mario.onKeyPress(event));
    addEventListener('keyup', (event) => this.mario.onKeyPress(event));
  }
  
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  move() {
    //this.background.move();
    this.mario.move();

    this.checkBounds();
  }

  checkBounds() {
    if (this.mario.x < 0) {
      this.mario.x = 0;
    } else if (this.mario.x + this.mario.w > this.canvas.width) {
      this.mario.x = this.canvas.width - this.mario.w;
    }
  }

  draw() {
    this.background.draw();
    this.mario.draw();
  }

}