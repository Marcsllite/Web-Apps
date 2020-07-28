class Flower {
  constructor(x, y, r, c = color(255, 255, 255, 150)) {
    this.x = x;
    this.y = y
    this.r = r;
    this.xDir = 1;
    this.yDir = 0;
    this.c = (c instanceof p5.Color)? c : color(255, 255, 255, 150);
  }

  show() {
    noStroke();
    fill(this.c);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  dir(x, y) {
    this.xDir = x;
    this.yDir = y;
  }

  move() {
    this.x += this.xDir;
    this.y += this.yDir;
  }

  onEdge() {
    return this.x >= width - this.r || this.x === this.r;
  }

  shiftDown() {
    this.xDir *= -1;
    this.y += this.r;
  }

  grow(val) {
    var area = ((this.r * this.r) * PI) + ((val * val) * PI);
    var newR = sqrt((area/ PI));
    this.r = newR;
  }
}