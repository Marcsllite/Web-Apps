var cells = [];

function setup() {
  createCanvas(700, 700);
  cells.push(new Cell(undefined, 80, color(random(100, 255), random(100, 255), 0, 150)));
}

function draw() {
  background(51);
  cells.forEach(cell => {
    cell.move();
    cell.show();
  });
}

function mousePressed() {
  for(var i = cells.length - 1; i >= 0; i--) {
    if(cells[i].clicked(mouseX, mouseY)) {
      cells = cells.concat(cells[i].divide());
      cells.splice(i, 1);
    }
  };
}