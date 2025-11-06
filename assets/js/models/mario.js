class Mario {

  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.h = 50;
    this.w = 50;

    this.vx = 0;
    this.vy = 0;
    this.ay = 0;

    this.ground = 0;
    this.isJumping = false;

    this.sprite = new Image();
    this.sprite.src = '/assets/images/sprites/mario.sprite.png';
    this.sprite.vFrames = 2;
    this.sprite.hFrames = 2;
    this.sprite.vFrameIndex = 0;
    this.sprite.hFrameIndex = 1;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameW = Math.floor(this.sprite.width / this.sprite.vFrames);
      this.sprite.frameH = Math.floor(this.sprite.height / this.sprite.hFrames);
      this.w = this.sprite.frameW;
      this.h = this.sprite.frameH;
    }
  }

  onKeyPress(event) {
    const isPressed = event.type === 'keydown';
    switch (event.keyCode) {
      case KEY_RIGHT:
        if (isPressed) {
          this.vx = MARIO_VX;
        } else {
          this.vx = 0;
        }
        break;
      case KEY_LEFT:
        if (isPressed) {
          this.vx = -MARIO_VX;
        } else {
          this.vx = 0;
        }
        break;
      case KEY_UP:
        if (!this.isJumping) {
          this.isJumping = true;
          this.ay = MARIO_AY;
          this.vy = -MARIO_VY;
        }
        break;
    }
  }

  groundTo(groundY) {
    this.y = groundY - this.h;
    this.ground = this.y;
  }

  move() {
    this.vy += this.ay;

    this.x += this.vx;
    this.y += this.vy;

    if (this.y > this.ground) {
      this.isJumping = false;
      this.vy = 0;
      this.ay = 0;
      this.y = this.ground;
    }
  }

  draw() {
    if (this.sprite.isReady) {

      Utils.debugDrawable(this);

      this.ctx.drawImage(
        this.sprite,
        this.sprite.vFrameIndex * this.sprite.frameW,
        this.sprite.hFrameIndex * this.sprite.frameH,
        this.sprite.frameW,
        this.sprite.frameH,
        this.x,
        this.y,
        this.w,
        this.h
      );

      this.animate();
    }
  }

  animate() {
    if (this.isJumping) {
      this.sprite.hFrameIndex = 0;
      this.sprite.vFrameIndex = 0;
    } else {
      this.sprite.hFrameIndex = 1;
      this.sprite.vFrameIndex = 0;
    }
  }

}