class Mario {

  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.h = 50;
    this.w = 50;
  }

  groundTo(groundY) {
    this.y = groundY - this.h;
  }

  draw() {
    this.ctx.fillRect(
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

}