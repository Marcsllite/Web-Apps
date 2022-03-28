class Flower {
  constructor(x = width/2, y = height/2, r = 15, c) {
    // keeps track of flower's current location
    // radius and color
    this.x = x;
    this.y = y;
    this.r = r;
    // getting a random rgb value for the flower's color
    var randRed = random(150, 255),
        randGreen = random(150, 255),
        randBlue = random(150, 255);
    this.c = (c instanceof p5.Color)?
             c : color(randRed, randGreen, randBlue, 100);

    // keeps track of flower's starting location
    this.sX = x;
    this.sY = y;

    this.top = false;  // whether the flower has reached the top
    
    this.angleDir = random(-1, 2);  // value to change the flower's angle by
    this.angle = 0;  // how much the flower has been rotated since creation (degrees)
    this.dead = false;  // if the flower has no more petals left
    this.numRotations = floor(random(3, 7));  // number of times to rotate the petals
    this.health = this.numRotations * 2;  // hp of flower (number of petals)
  }

  show() {
    this.drawFlower();
    this.drawStem();
  }

  move() {
    var oldX = this.x,
        oldY = this.y;

    // rotating the flower about (this.sX, height)
    this.x = cos(radians(this.angleDir)) * (oldX - this.sX) - 
             sin(radians(this.angleDir)) * (oldY - height) + this.sX; 
    this.y = sin(radians(this.angleDir)) * (oldX - this.sX) +
             cos(radians(this.angleDir)) * (oldY - height) + height;

    this.top = this.y <= 0;  // checking if the flower has reached the top
    
    this.angle += this.angleDir;  // keeping track of the total angle rotated
    
    // making sure we don't rotate past 30 degrees or -30 degrees
    if(this.angle >= 30) {
      this.angleDir = random(-1, 0);
    } else if(this.angle <= -30){
      this.angleDir = random();
    }
  }

  grow() {
    this.y -= 5;

    // checking if the flower has reached the top
    this.top = this.y <= 0;  
  }

  wither() {
    this.health--;

    // checking to see if flower has no more petals
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
    for (let i = 0; i < this.health; i ++) {
      ellipse(0, 0, this.r, this.r/(this.numRotations * .5));
      rotate(PI/this.numRotations);
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