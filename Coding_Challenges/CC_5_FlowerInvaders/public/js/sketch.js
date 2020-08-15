// var hammer; // variable to hold the hammer.js object
var can;
var drops = [];  // array to hold the water drops
var flowers = [];  // array to hold the flowers
var numFlowers = 25;  // maximum number of flowers in the array

function setup() {
  // selecting the smallest side length and using that to create a square canvass
  var smallestR = (displayWidth > displayHeight)? displayHeight : displayWidth;

  // making sure the smallest side length is no greater than 600 pixels
  // making sure the smallest side length is 90% of the display
  var r = smallestR > 600? 600 : smallestR * .9;

  // making sure the smallest side length is no smaller than 200 pixels
  if(r < 200) {
    r = 200;
  }

  var canvasHolder = document.querySelector('.canvasHolder');
  createCanvas(r, r).parent(canvasHolder);  // creating square canvas

  // // creating hammer.js options
  // var options = {
  //   preventDefault: true
  // };
  // // creating hammer object that checks the entire document
  // hammer = new Hammer(document, options);
  
  // // allowing the user to swipe in any direction
  // hammer.get('swipe').set({
  //   direction: Hammer.DIRECTION_ALL
  // });

  // hammer.on("swipe", swiped);  // calling swiped function on swipe action

  var overlapping,  // true is flowers are overlapping o.w false
      loops = 0;  // keeps track of the number of times the while loop has run
  
  // looping until we've reached the max number of flowers
  while(flowers.length < numFlowers) {  
    overlapping = false;  // assuming flower is not overlapping
    
    // selecting sa random position and radius
    var randX = random(r/16, r - (r/16)), 
        randY = random(r - (r/3), r - (r/16)),
        randR = random(20, 31);

    // making sure that the position and size we selected
    // does not lead to any overlap with the previously created flowers
    flowers.forEach(other => {
      var d = dist(randX, randY, other.x, other.y);
      if(d < randR + other.r) {
        overlapping = true;
      }
    });

    // if the position and size did not cause an overlap
    // add the flower to the end of the array
    // resetting the number of times the loop
    // has run without adding a new flower
    if(!overlapping) {
      // console.log(`index ${flowers.length}: ${loops} loops`);
      flowers[flowers.length] = new Flower(randX, randY, randR);
      loops = 0;
    }

    // updating the number of times the while loop has run
    // without adding a flower
    loops++;
    // breaking out of the loop if it is stuck
    // i.e: looped over 1000 times before adding a new flower
    if(loops >= 1000) {
      break;
    }
  }

  setInterval(() => {
    flowers.forEach(flower => {
      flower.grow();
    });
  }, 3000);
}

function draw() {
  background(51);

  if(flowers.length === 0) {
    noLoop();
  }

  // drawing the flowers
  // and making them bobble
  flowers.forEach(flower => {
    flower.move();
    flower.show();
    if(flower.top) {
      noLoop();
    }
  });

  for(var i = drops.length - 1; i >= 0; i--) {
    // Showing and moving the drops
    drops[i].move();
    drops[i].show();

    // checking if the drop hits the flower
    // and making the flower wither and
    // noting that drop needs to be removed from the array
    flowers.forEach(flower => {
      if(flower.hit(drops[i])) {
        flower.wither();
        drops[i].evaporate();
      }
    });

    // removing drop if it needs to be removed
    if(drops[i].toDelete) {
      drops.splice(i, 1);
      break;
    }

     // removing the flower if it has no more petals
    for(var j = flowers.length - 1; j >= 0; j--) {
      if(flowers[j].dead) {
        flowers.splice(j, 1);
        break;
      }
    }
  }
  
  // noLoop();
}

// function keyReleased(){
//   if(keyCode === LEFT_ARROW) {
//     ship.dir(0, undefined);
//   } else if(keyCode === RIGHT_ARROW) {
//     ship.dir(undefined, 0);
//   }
// }

function mousePressed() {
  var drop = new Drop(width/2, 0, 8);
  drop.setDestination(mouseX, mouseY);
  drops.push(drop);
}

function keyPressed() {
  if(key == ' ') {
    var drop = new Drop(width/2, 0, 8);
    drop.setDestination(undefined, height);
    drops.push(drop);
  }

  // if(keyCode === LEFT_ARROW) {
  //   ship.dir(-5, 0);
  // } else if(keyCode === RIGHT_ARROW) {
  //   ship.dir(5, 0);
  // }
}

// function swiped(event) {
//   if (event.direction == 8) {  // UP
//   } else if (event.direction == 16) {  // DOWN
//   }  else if (event.direction == 2) {  // LEFT
//   } else if (event.direction == 4) {  // RIGHT
//   }
// }