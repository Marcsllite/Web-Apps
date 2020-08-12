class Drop {
  constructor(x, y, r, c) {
    this.x = x;
    this.y = y
    this.r = r;
    this.steps = 5;
    this.d = {xDir: x, yDir: y};  // object to hold the destination of the drop
    this.c = (c instanceof p5.Color)? c : color(255, 255, 255);
    this.toDelete = false;
  }

  show() {
    fill(this.c);
    ellipseMode(RADIUS);
    ellipse(this.x, this.y, this.r, this.r);
  }

  setDestination(x = this.x, y = this.y) {
    this.d = {xDir: x, yDir: y};
  }

  move() {
    // if(this.d.xDir != this.x && this.d.yDir != this.y) {
      var max, min, xDir, yDir;
      if(abs(this.x - this.d.xDir) > abs(this.y - this.d.yDir)) {
        max = this.x - this.d.xDir;
        min = this.y - this.d.yDir

        xDir = this.steps;
        yDir = (min * this.steps) / max;
      } else {
        max = this.y - this.d.yDir
        min = this.x - this.d.xDir;

        xDir = (min * this.steps) / max;
        yDir = this.steps;
      }

      // calculating how many pixels to move the drop
      // in the x and y direction to a destination off the screen
      // (destination off the screen has same slop as actual destination)
      // var xDir = (this.x - this.d.xDir) / this.steps, 
      //     yDir = (this.y - this.d.yDir) / this.steps;

      // moving the drop
      this.x += xDir;
      this.y += yDir;
      // console.log(`moving towards (${this.d.xDir}, ${this.d.yDir})`);
    
      // marking drop for deletion if
      // it is out of bounds of the window
      this.toDelete = this.y >= height ||
                      this.x < 0 ||
                      this.x > width;
    // }
  }

  evaporate() {
    this.toDelete = true;
  }
}