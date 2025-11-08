class FireBall {

  constructor(ctx, x, y, w = 8 * 1.5, h = 8 * 1.5, vx = 3) {
    this.ctx = ctx;
    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.vx = vx; 

    this.sprite = new Image();
    this.sprite.src = '/assets/images/sprites/fireball.sprite.png';
    this.sprite.vFrames = 4;
    this.sprite.hFrames = 1;
    this.sprite.vFrameIndex = 0;
    this.sprite.hFrameIndex = 0;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameW = Math.floor(this.sprite.width / this.sprite.vFrames);
      this.sprite.frameH = Math.floor(this.sprite.height / this.sprite.hFrames);
    }

    this.drawCount = 0;
    this.isUsed = false;
  }

  move() {
    this.x += this.vx;
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
      this.drawCount++;
    }
  }

  animate() {
    if (this.drawCount % 10 === 0) {
      this.drawCount = 0;
      this.sprite.vFrameIndex = (this.sprite.vFrameIndex + 1) % this.sprite.vFrames;
    }
  }

  collidesWith(element) {
    return (
      this.x < element.x + element.w &&
      this.x + this.w > element.x &&
      this.y < element.y + element.h &&
      this.y + this.h > element.y
    );
  }

}