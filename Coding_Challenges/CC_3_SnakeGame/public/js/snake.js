class Snake extends Block {
  /**
   *Creates an instance of Snake.
   * @param {number} r
   * @memberof Snake
   */
  constructor(r) {
    super(r);
    this.size = 0;
    this.body = [];
  }

  /**
   * @override
   * Updates the snake's location
   * 
   * @memberof Snake
   */
  update() {
    // // checking if the snake is dead
    if(this.death()) {
      super.pickLocation();
      this.size = 0;
      this.body = [];
    }

    if(this.size > 0) {
      var tempX = this.x,
          tempY = this.y;

      // moving the body if the snake is moving
      if (this.xSpeed > 0 && this.ySpeed > 0) {
        if(this.size === this.body.length) {
          for (var i = 0; i < this.size - 1; i++) {
            this.body[i] = this.body[i+1];
          }
        }
        tempY += this.r;
      }

      // adding a block to the beginning of the array
      this.body[this.size - 1] = new Block(tempX, tempY);
    }

    super.update();
  }

  /**
   * @override
   * Displays the snake and its body
   *
   * @memberof Snake
   */
  show() {
    super.show();
    this.body.forEach(b => {
        b.show();
    });
  }

  /**
   * Changes the direction that the snake is moving
   *
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @memberof Snake
   */
  dir(x = 0, y = 0) {
    // not allowing the snake to go backwards once
    // it has eaten food
    if(this.size > 0) {
      if(this.xSpeed === -x) {
        x = this.xSpeed;
      }

      if(this.ySpeed === -y) {
        y = this.ySpeed;
      }
    }
    
    super.dir(x, y);
  };

  isColliding(x = -1, y = -1) {
    // returning false if user did not
    // provide a proper location
    if(x === -1 || y === -1) {
      return false;
    } else {
      this.body.forEach(b => {
        if(b.x === x && b.y === y){
          return true;
        }
      });
      return this.x === x && this.y === y;
    }
  }

  eat(block) {
    if(block instanceof Block){
      if(dist(block.x, block.y, this.x, this.y) <= 0) {
        this.size++;
        return true;
      } else {
        return false
      }
    }
    return false;
  }

  death() {
    // checking if the snake has gone out of bounds
    var ret = (this.x === - this.r || this.x == width ||
              this.y === - this.r || this.y == height);
    
    // returning true if the snake is out of bounds 
    if(ret) {
      return ret;
    }

     // checking if the snake has touched its body
    for (var i = 0; i < this.body.length; i++) {
     if(dist(this.x, this.y, this.body[i].x, this.body[i].y) < 1) {
       ret = true;
     }
    }

    return ret;
  }
}
