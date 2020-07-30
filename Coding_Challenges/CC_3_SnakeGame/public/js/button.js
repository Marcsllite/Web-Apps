class Button {
  /**
   * Creates an instance of Button.
   * @param {number} [x=width/2]
   * @param {number} [y=height / 2]
   * @param {number} [r=20]
   * @param {p5.Color} [c=new color(255, 255, 255)]
   * @memberof Button
   */
  constructor(x = width/2, y = height / 2, r = 20, c = new color(255, 255, 255)) {
    this.x = x;
    this.y = y
    this.r = r;
    this.c = c;
  }

  /**
   * Displays the button on the canvas
   *
   * @memberof Button
   */
  show() {
    fill(this.c);
    noStroke();
    ellipseMode(RADIUS);
    ellipse(this.x, this.y, this.r, this.r);
  }

  /**
   * Adds text to the center of the button
   *
   * @param {string} t the text to display inside the button
   * @param {number} s the size of the text
   * @param {const} f the font style of the text {NORMAL, ITALIC, BOLD, BOLDITALIC}
   * @memberof Button
   */
  addText(t, s=24, f = BOLD) {
    if(t !== undefined) {
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(s);
      textStyle(f);
      text(t, this.x, this.y);
    }
  }

  /**
   * Calculates whether the mouse is within the button
   * and was pressed
   *
   * @returns if the mouse was pressed inside the button
   * @memberof Button
   */
  pressed() {
    var d = dist(mouseX, mouseY, this.x, this.y)
    if(d < this.r && mouseIsPressed) {
      return true;
    } else { 
      return false;
    }
  }  
}
