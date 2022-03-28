/**
 * @class Block
 */
class Block {
  /**
   * Creates an instance of Block.
   * @param {number} x (OPTIONAL) the x location of the block
   * @param {number} y (OPTIONAL) the y location of the block
   * @param {number} [r=10] the length and width of the block
   * @param {p5.Color} [c=color(255)] the color of the block
   * @memberof Block
   */
  constructor(x, y, r = 10, c = color(255)) {
    this.r = r;
    this.c = (c instanceof p5.Color)? c : color(255);
    this.pickLocation(x, y);
    this.xSpeed = 0;
    this.ySpeed = 0
  }

  /**
   * Displays the block on the canvas
   *
   * @memberof Block
   */
  show() {
    fill(this.c);
    stroke(0);
    rect(this.x, this.y, this.r, this.r);
  }

  /**
   * Updates the location of the block
   * based on its x and y speed
   *
   * @memberof Block
   */
  update() {
    this.x = this.x + this.xSpeed * this.r;
    this.y = this.y + this.ySpeed * this.r;
  }

  /**
   * Moves block the given number of steps
   * in the given direction
   * 
   * @param {string} dir the direction to move the block 
   *                {'up', 'down', 'left', 'right'}
   * @param {number} steps the number of steps to move the block
   */
  moveSteps(dir = 'up', steps = 1,) {
    switch(dir){
      case 'up':
        this.y = this.y - Math.abs(steps) * this.r;
        break;
      case 'down':
        this.y = this.y + Math.abs(steps) * this.r;
        break;
      case 'left':
        this.x = this.x - Math.abs(steps) * this.r;
        break;
      case 'right':
        this.x = this.x + Math.abs(steps) * this.r;
        break;
      default:
        console.log(`${this.constructor.name}.moveSteps(${dir}, ${steps}): invalid direction ${dir}`);
        break;
    }
  }

  /**
   * updates the x and y speed of the block
   *
   * @param {number} [x=0] the new x speed of the block
   * @param {number} [y=0] the new y speed of the block
   * @memberof Block
   */
  dir(x = 0, y = 0) {
    this.xSpeed = x;
    this.ySpeed = y;
  }

  /**
   * picks a random location on the canvas to place the block
   * after placing the block, sets the x and y speed to 0 to stop it from moving
   *
   * @param {number} x (OPTIONAL) the new x location of the block
   * @param {number} y (OPTIONAL) the new y location of the block
   * @memberof Block
   */
  pickLocation(x, y) {
    var numCols = floor(width / this.r) - 1;
    var numRows = floor(height / this.r) - 1;
    var randCol = floor(random(numCols));
    var randRow = floor(random(numRows));
    this.x = (x == undefined)? randCol * this.r : x;
    this.y = (y == undefined)? randRow * this.r : y;
    this.dir();
  }
}
