var ship;
var drops = [];
var flowers = [];
var flowerOnEdge;

function setup() {
  createCanvas(600, 400);
  flowerOnEdge = false;
  ship = new Ship(width/2, 20);

  drop = new Drop(width/2, height/2, 8, color(0, 0, 150))
  for(var i = 0; i < 6; i++) {
    flowers[i] = new Flower(i*80+80, 50, 30, color(150, 0, 0, 150));
  }
}

function draw() {
  background(51);
  ship.show();
  ship.move();

  for(var i = drops.length - 1; i >= 0; i--) {
    // checking if the drop hits the flower and growing the flower
    flowers.forEach(flower => {
      if(drops[i].hits(flower)) {
        flower.grow(drops[i].r);
        drops[i].evaporate();
      }
    });

    // removing drop if it needs to be removed
    if(drops[i].toDelete) {
      drops.splice(i, 1);
      break;
    }

    // showing and moving the drops
    drops[i].show();
    drops[i].move();
  }
  
  // drawing and moving the flower 
  flowers.forEach(flower => {
    flower.show();
    flower.move();
    if(flower.onEdge()) {
      flowerOnEdge = true;
    }
  });

  // moving shifting all the flowers down if one of them is on the edge
  if(flowerOnEdge){
    flowers.forEach(flower => {
      flower.shiftDown();
    });
    flowerOnEdge = false;
  }
}

function keyReleased(){
  if(keyCode === LEFT_ARROW) {
    ship.dir(0, undefined);
  } else if(keyCode === RIGHT_ARROW) {
    ship.dir(undefined, 0);
  }
}

function keyPressed() {
  if(key == ' ') {
    var drop = new Drop(ship.x, height, 8);
    drops.push(drop);
  }

  if(keyCode === LEFT_ARROW) {
    ship.dir(-5, 0);
  } else if(keyCode === RIGHT_ARROW) {
    ship.dir(5, 0);
  }
}