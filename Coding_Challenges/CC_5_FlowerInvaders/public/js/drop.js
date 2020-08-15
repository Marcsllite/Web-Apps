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

    // push();
    // stroke(255);
    // strokeWeight(3);
    // line(width/2, 0, this.d.xDir, this.d.yDir);
    // pop();
  }

  setDestination(x = this.x, y = this.y) {
    // if the destination is inside the window
    if((x < width && x > 0) && (y < height && y > -1)) {
      // calculating the distance for the x and y coordinate
      // to reach one of the edges of the window (using the smallest distance)
      // since the drop is falling down we only have to worry
      // about the distance from the current y to the bottom
      var yDist = height - y,
          xDist = (x < (width - x))? -x : width - x;

      // moving either the x or y coordinate
      // outside of the window area to force the
      // drop to keep moving until it hits the edge
      // or a flower
      var slope = (this.x - x) / (this.y - y);
      if(xDist < yDist) {
        this.d = {
          xDir: x + xDist,
          yDir: y + abs(xDist/slope)
        };
      } else {
        this.d = {
          xDir: x + slope * yDist,
          yDir: y + abs(yDist)
        };
      }
    } else {
      this.d = {xDir: x, yDir: y};
    }
  }

  move() {
    var max, min, xDir, yDir,
          xDist = this.x - this.d.xDir,
          yDist = this.y - this.d.yDir;

    // seeing which distance along both axes has a greater
    // distance from the drop's current position to its
    // destination and labeling them accordingly
    // calculating the x and y direction if we move this.steps
    // on the opposite direction. (to maintain the slope of
    // the destination)
    if(abs(xDist) > abs(yDist)) {
      max = xDist;
      min = yDist;

      xDir = (xDist < 0)? this.steps : -this.steps;
      yDir = (min * xDir) / max;
    } else {
      max = yDist;
      min = xDist;

      xDir = (min * this.steps) / max;
      yDir = this.steps;
    }

    // console.log(`xDir: ${xDir}, yDir: ${yDir}`);

    // moving the drop
    this.x += xDir;
    this.y += yDir;
      
    // marking drop for deletion if
    // it is out of bounds of the window
    this.toDelete = this.y >= height ||
                    this.x <= 0 ||
                    this.x >= width;
  }

  evaporate() {
    this.toDelete = true;
  }
}