
class Game {

  constructor(canvasId, onGameOver = () => {}) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = CANVAS_W;
    this.canvas.height = CANVAS_H;
    this.ctx = this.canvas.getContext('2d');

    this.fps = FPS;
    this.drawIntervalId = undefined;

    this.background = new Background(this.ctx, BG_MAIN);
    
    this.mario = new Mario(this.ctx, 50, 0);
    this.mario.groundTo(this.canvas.height - GROUND_Y);
    
    this.coins = [
      new Coin(this.ctx, 300, this.canvas.height - 100),
      new Coin(this.ctx, 600, this.canvas.height - 150),
    ];
  
    this.enemies = [];

    this.totalPoints = 0;
    // -- hint: LOAD
    this.scores = localStorage.getItem(LOCAL_STORAGE_SCORE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCORE_KEY)) : {};
    // -- hint: STORE
    localStorage.setItem(LOCAL_STORAGE_SCORE_KEY, JSON.stringify(this.scores));

    this.setupListeners();
    this.setupEnemySpawn();

    this.onGameOver = onGameOver;
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
        this.checkCollisions();
      }, this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }

  setupListeners() {
    addEventListener('keydown', (event) => this.mario.onKeyPress(event));
    addEventListener('keyup', (event) => this.mario.onKeyPress(event));
  }

  setupEnemySpawn() {
    setInterval(() => {
      const vx = Math.random() > 0.75 ? -6 : -3;
      const bowser = new Bowser(this.ctx, this.canvas.width, 0, vx);
      bowser.groundTo(this.canvas.height - GROUND_Y);
      this.enemies.push(bowser);
    }, BOWSER_ENEMY_SPAWN_INTERVAL);

  }
  
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.coins = this.coins.filter((coin) => !coin.isCollected);
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.isDead && (
        (enemy.vx < 0 && enemy.x + enemy.w > 0) ||
        (enemy.vx > 0 && enemy.x < this.canvas.width)
      )
    });
    this.mario.clear();
    console.log(this.enemies);
  }

  move() {
    //this.background.move();
    this.mario.move();
    this.enemies.forEach((enemy) => enemy.move());

    this.checkBounds();
  }

  checkBounds() {
    if (this.mario.x < 0) {
      this.mario.x = 0;
    } else if (this.mario.x + this.mario.w > this.canvas.width) {
      this.mario.x = this.canvas.width - this.mario.w;
    }
  }

  checkCollisions() {
    // COINS COLLISIONS
    for (const coin of this.coins) {
      if (this.mario.collidesWith(coin)) {
        coin.isCollected = true;
        this.totalPoints += coin.points;
      }
    }

    for (const enemy of this.enemies) {
      for (const bullet of this.mario.bullets) {
        if (bullet.collidesWith(enemy) && !bullet.isUsed) {
          enemy.isDead = true;
          bullet.isUsed = true;
        }
      }
    }

    // ENEMY COLLISIONS
    for (const enemy of this.enemies) {
      if (this.mario.collidesWith(enemy)) {
        if (this.mario.y < enemy.y && this.mario.isJumping) {
          enemy.isDead = true;
        } else {
          this.gameOver();
        }
      }
    }
  }


  gameOver() {
    this.stop();
    console.log('Game Over!');
    this.onGameOver();
  }

  draw() {
    this.background.draw();
    this.coins.forEach((coin) => coin.draw());
    this.enemies.forEach((enemy) => enemy.draw());
    this.mario.draw();
  }

}