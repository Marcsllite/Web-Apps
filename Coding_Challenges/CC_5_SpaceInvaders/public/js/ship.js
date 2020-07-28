class Ship {
  constructor(x, r, c = color(255, 255, 255)) {
    this.x = x;
    this.r = r;
    this.c = (c instanceof p5.Color)? c : color(255, 255, 255);
    this.xDir = 0;
    this.yDir = 0;
  }

  show() {
    fill(this.c);
    rectMode(CENTER);
    rect(this.x, height - this.r, this.r, this.r * 3);
  }

  dir(x = this.xDir, y = this.yDir){
    this.xDir = x;
    this.yDir = y;
  }

  move() {
    this.x += this.xDir;
    this.y += this.yDir;
  }
}