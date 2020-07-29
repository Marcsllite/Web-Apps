class Cell {
  constructor(pos, r = 10, c = color(255, 255, 255, 150)) {
    this.pos = (pos instanceof p5.Vector)? 
                pos.copy() : 
                createVector(random(r, width - r), random(r, height - r));
    this.r = r;
    this.c = (c instanceof p5.Color)? c : color(255, 255, 255, 150);
    this.vel = p5.Vector.random2D();
    this.growing = this.r <= 3;
    console.log("R = :" + this.r);
  }

  setVel(vel = p5.Vector.random2D()) {
    this.vel = (vel instanceof p5.Vector)? vel : p5.Vector.random2D();
  }

  move() {
    // this.setVel();
    this.pos.add(this.vel);
    this.checkBounds();
  }

  grow() {
    if(this.growing) {
      this.r += 0.5;
      this.growing = this.r < 40;
    }
  }

  show() {
    noStroke();
    fill(this.c);
    ellipseMode(RADIUS);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }

  checkBounds() {
    var onTopEdge = this.pos.y < 0 + this.r;
    var onBottomEdge = this.pos.y > height - this.r;
    var onLeftEdge = this.pos.x < 0 + this.r;
    var onRightEdge = this.pos.x > height - this.r;

    if(onTopEdge || onBottomEdge) {
      this.vel.y *= -1;
    } else if(onLeftEdge || onRightEdge) {
      this.vel.x *= -1;
    }
  }

  clicked(x, y) {
    // TODO: fix overlapping cells thinking theyve been clicked
    var d = dist(this.pos.x, this.pos.y, x, y);
    if(d <= this.r) {
      return true;
    } else {
      return false;
    }
  }

  divide() {
    var newColor = color(random(255), random(255), random(255), 150)
    var cellA = new Cell(this.pos, this.r / 2, newColor);
    var cellB = new Cell(this.pos, this.r / 2, newColor);
    return [ cellA, cellB ];
  }
}