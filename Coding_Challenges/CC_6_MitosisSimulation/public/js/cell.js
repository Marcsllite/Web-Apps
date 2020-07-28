class Cell {
  constructor(pos = createVector(random(width), random(height)), r = 10, c = color(255, 255, 255, 150)) {
    this.pos = (pos instanceof p5.Vector)? pos.copy() : createVector();
    this.r = r;
    this.c = (c instanceof p5.Color)? c : color(255, 255, 255, 150);
    this.vel = p5.Vector.random2D();
  }

  setVel(vel = p5.Vector.random2D()) {
    this.vel = (vel instanceof p5.Vector)? vel : p5.Vector.random2D();
  }

  move() {
    this.setVel();
    this.pos.add(this.vel);
  }

  show() {
    noStroke();
    fill(this.c);
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }

  clicked(x, y) {
    // TODO: fix overlapping cells thinking theyve been clicked
    var d = dist(this.pos.x, this.pos.y, x, y);
    if(d <= this.r) {
      console.log(`Cell at (${this.pos.x}, ${this.pos.y}) was clicked`);
      return true;
    } else {
      return false;
    }
  }

  divide() {
    var cellA = new Cell(this.pos, this.r / 2, this.c);
    var cellB = new Cell(this.pos, this.r / 2, this.c);
    return [ cellA, cellB ];
  }
}