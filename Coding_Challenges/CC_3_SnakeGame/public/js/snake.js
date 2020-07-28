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
      if(this.size === this.body.length) {
        for (var i = 0; i < this.size - 1; i++) {
          this.body[i] = this.body[i+1];
        }
      }

      // adding a block to the beginning of the array
      this.body[this.size - 1] = new Block(this.x, this.y);
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
    var ret = (this.x === 0 - this.r || this.x == width ||
              this.y === 0 - this.r || this.y == height);
    
    for (var i = 0; i < this.body.length; i++) {
     if(dist(this.x, this.y, this.body[i].x, this.body[i].y) < 1) {
       ret = true;
     }
    }

    return ret;
  }
}
