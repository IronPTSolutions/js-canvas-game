
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
  
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  move() {
    this.background.move();
  }

  draw() {
    this.background.draw();
    this.mario.draw();
  }

}