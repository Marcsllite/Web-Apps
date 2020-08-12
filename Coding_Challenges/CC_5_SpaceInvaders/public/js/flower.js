class Flower {
  constructor(x = width/2, y = height/2, r = 15, c) {
    this.x = x;
    this.y = y
    this.sX = x;
    this.sY = y;
    this.r = r;
    this.xDir = 1;
    this.yDir = 0;
    this.angleDir = random(-1, 2);
    this.angle = 0;
    this.dead = false;
    this.numPetals = floor(random(3, 7));
    this.health = this.numPetals * 2;
    var randRed = random(150, 255),
        randGreen = random(150, 255),
        randBlue = random(150, 255);
    this.c = (c instanceof p5.Color)? c : color(randRed, randGreen, randBlue, 100);
  }

  show() {
    this.drawFlower();
    this.drawStem();
  }

  dir(x, y) {
    this.xDir = x;
    this.yDir = y;
  }

  move() {
    translate(this.x, height);
    rotate(radians(this.angle));
    translate(-this.x, -height);
  }

  update() {
    if(this.angle >= 30) {
      this.angleDir = random(-1, 0);
    } else if(this.angle <= -30){
      this.angleDir = random();
    }
    this.angle += this.angleDir;
  }

  onEdge() {
    return this.x >= width - this.r || this.x <= this.r;
  }

  wither() {
    this.health--;
    if(this.health <= 0) {
      this.dead = true;
      this.health = 0;
    }
  }

  hit(drop) {
    if(drop instanceof Drop) {
      var d = dist(this.x, this.y, drop.x, drop.y);
      if(this.health > 0) {
        return d <= this.r * .75 + drop.r;
      } else {
        return d <= this.r * .25 + drop.r;
      }
    }
    return false;
  }

  drawFlower(){
    // drawing center petal
    noStroke();
    fill(255);
    ellipseMode(RADIUS);
    var radius = this.r * .25;
    ellipse(this.x, this.y, radius, radius);

    // drawing petals that go around the center
    noStroke();
    fill(this.c);
    ellipseMode(CORNER);

    push();
    translate(this.x, this.y);
    for (let i = 0; i < this.health; i ++) {
      ellipse(0, 0, this.r, this.r/(this.numPetals * .5));
      rotate(PI/this.numPetals);
    }
    pop();
  }

  drawStem() {
    noFill();
    stroke(0, 204, 0, 75);
    strokeWeight(5);
    line(this.x, this.y, this.x, height);
  }
}