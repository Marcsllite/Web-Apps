class Drop {
  constructor(x, y, r, c = color(255, 255, 255)) {
    this.x = x;
    this.y = y
    this.r = r;
    this.c = (c instanceof p5.Color)? c : color(255, 255, 255);
    this.toDelete = false;
  }

  show() {
    fill(this.c);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  move() {
    this.y -= 5;

    this.toDelete = this.y <= 0;
  }

  evaporate() {
    this.toDelete = true;
  }

  hits(flower) {
    if(flower instanceof Flower) {
      var d = dist(this.x, this.y, flower.x, flower.y);
      return d <= this.r + flower.r;
    }
    return false;
  }
}