class Flower {
  constructor(x = width/2, y = height/2, r = 15, c) {
    this.x = x;
    this.y = y;
    this.logged = false;
    this.sX = x;
    this.sY = y;
    this.top = false;
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
    var oldX = this.x,
        oldY = this.y;

    // rotating the flower about (this.sX, height)
    this.x = cos(radians(this.angleDir)) * (oldX - this.sX) - 
             sin(radians(this.angleDir)) * (oldY - height) + this.sX; 
    this.y = sin(radians(this.angleDir)) * (oldX - this.sX) +
             cos(radians(this.angleDir)) * (oldY - height) + height;

    if(this.y <= 0) {
      this.top = true;
    }
    
    this.angle += this.angleDir;  // keeping track of the total angle rotated
    
    // making sure we don't rotate past 30 degrees or -30 degrees
    if(this.angle >= 30) {
      this.angleDir = random(-1, 0);
    } else if(this.angle <= -30){
      this.angleDir = random();
    }
  }

  onEdge() {
    return this.x >= width - this.r || this.x <= this.r;
  }

  grow() {
    this.y -= 5;

    if(this.y <= 0) {
      this.top = true;
    }
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

  drawFlower(x = this.x, y = this.y, c){
    c = (c instanceof p5.Color)? c : this.c;

    // drawing center petal
    push();
    noStroke();
    fill(255);
    ellipseMode(RADIUS);
    var radius = this.r * .25;
    ellipse(x, y, radius, radius);
    pop();

    // drawing petals that go around the center
    push();
    noStroke();
    fill(c);
    ellipseMode(CORNER);
    
    translate(x, y);
    // // variables for holding the current and old
    // // petal x and y location
    // var pX = x + radius, pY = y + radius, oldPX, oldPY;
    for (let i = 0; i < this.health; i ++) {
      // oldPX = pX, oldPY = pY;
      // ellipse(pX, pY, this.r, this.r/(this.numPetals * .5));
      ellipse(0, 0, this.r, this.r/(this.numPetals * .5));
      rotate(PI/this.numPetals);

      // // rotating the petal about (x, y)
      // pX = cos(PI/this.numPetals) * (oldPX - x) - 
      //     sin(PI/this.numPetals) * (oldPY - y) + x; 
      // pX = sin(PI/this.numPetals) * (oldPX - x) +
      //     cos(PI/this.numPetals) * (oldPY - y) + y;
    }
    pop();
  }

  drawStem(x = this.x, y = this.y, c = color(0, 204, 0, 75)) {
    push();
    noFill();
    stroke(c);
    strokeWeight(5);
    line(x, y, this.sX, height);
    pop();
  }
}