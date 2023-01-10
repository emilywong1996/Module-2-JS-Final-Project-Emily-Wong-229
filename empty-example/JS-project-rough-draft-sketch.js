// Time Attack Meteors
// Programmer: Emily Wong
// Academy/Cohort: Bay Valley Tech Cohort 229
// Inspired by Khan Academy's Advanced JS: Games and Visualizations, p5's resources, and the Blaster's arcade game
// Version 1 created on 02JAN23 at 1304

// Set the width and height for some of the parameters

let width = 800;
let height = 800;
let meteorWidth = 80;
let meteorHeight = 50;

// Create the entity that'll achieve the player's goal: interacting with meteors

let meteor = [];
let fireMeteor = [];
let iceMeteor = [];

// Creates the visual for the background

let earth;
let blaster;
let timer;
let cursor;

// Setting up the program

function setup() {

  // Creates the UI for the game
  createCanvas(width, height);
  earth = new Earth();
  blaster = new Blaster();
  cursor = new Cursor(width/2, height - 75);
  timer = new Timer();

  // Makes an array of regular meteors
  for (let i = 0; i < 400; i++) {
    meteor.push(new Meteor(random(meteorWidth/2, width - meteorWidth), i * 100 - 39500))
  }

  // Makes an array of fire meteors
  for (let i = 0; i < 400; i++) {
    fireMeteor.push(new FireMeteor(i * meteorWidth * 2 + width, random(meteorHeight, height - meteorWidth/2 - 180)))
  }
}

// Draw the code

function draw() {

  background(0);
  noStroke();

  if (floor(frameCount/90) <= 40) {
    // Spawns the regular meteors, checks for collision, then moves the meteors down
    for (let i = 0; i < meteor.length; i++) {
      meteor[i].show();
      cursor.checkForMeteorCollision(meteor[i]);
      meteor[i].y += 1;
    }

  } else if (floor(frameCount/90) <= 80) {
    
    // Spawns the fire meteors, checks for collision, then moves the meteors left
    for (let i = 0; i < fireMeteor.length; i++) {
      fireMeteor[i].show();
      cursor.checkForFireMeteorCollision(fireMeteor[i]);
      fireMeteor[i].x -= 2;
    }

    // Speeds up the regular meteors, checks for collision, then moves the meteors down
    for (let i = 0; i < meteor.length; i++) {
      meteor[i].show();
      cursor.checkForMeteorCollision(meteor[i]);
      meteor[i].y += 2;
    }

  } else if (floor(frameCount/90) <= 120) {

     // Speeds the fire meteors, checks for collision, then moves the meteors left
     for (let i = 0; i < fireMeteor.length; i++) {
      fireMeteor[i].show();
      cursor.checkForFireMeteorCollision(fireMeteor[i]);
      fireMeteor[i].x -= 3;
    }

    // Speeds up the regular meteors, checks for collision, then moves the meteors down
    for (let i = 0; i < meteor.length; i++) {
      meteor[i].show();
      cursor.checkForMeteorCollision(meteor[i]);
      meteor[i].y += 3;
    }
   
  }

  earth.show();
  blaster.show();
  cursor.pointer();
  cursor.show();
  timer.show();
}

// Creating the class Earth

class Earth{

  show(){

    // Creating the water
    fill(0, 0, 255);
    ellipse(width/2, height - 80, width, height/4);
    rect(0, height - 80, width, height/10);

    // Creating the land
    fill(0, 255, 0);
    ellipse(width/5, height - 70, width/4, height/10);
    ellipse(width - 280, height - 80, width/2, height/8);
  }
}

// Creating the class Blaster

class Blaster{

  show(){

    // Creating the laser
    stroke(255, 0, 0);
    fill(255, 0, 0);
    line(width/2, height - 75, mouseX, mouseY);
    noStroke();

    // Creating the blaster
    fill(0);
    arc(width/2, height - 70, 70, 70, PI, TWO_PI);
    fill(255);
  }
}

// Creating the class Timer

class Timer {

  show(){

    if (floor(frameCount/90) > 120) {
      // Runs this timer code if time is up
      fill(255);
      textSize(35);
      text("Time's Up!", width/2 - 100, height/2 - 45);
      text("Score: " + cursor.score, width/2 - 100, height/2);

    } else if (floor(frameCount/90) >= 110) {
      // Runs this time code 10 seconds before time is up
      textSize(30);
      
      fill(255, 0, 0);
      text("Time: " + String(120 - floor(frameCount/90)), 20, 40);
      
      fill(255);
      text("Score: " + cursor.score, width - 200, 40);

    } else {
      // Runs this time code if it's not 10 seconds before time is up
      fill(255);
      textSize(30);
      text("Time: " + String(120 - floor(frameCount/90)), 20, 40);
      text("Score: " + cursor.score, width - 200, 40);
    }

  }
  
}

// Create the entity that'll interact the user's input to the game: the cursor

let Cursor = function(x, y){
  this.x = x;
  this.y = y;
  this.score = 0;
}

// Gives the coordinates of the cursor
Cursor.prototype.pointer = function(){
  this.x = mouseX;
  this.y = mouseY;
}

// Draws the cursor
Cursor.prototype.show = function(){
  fill(255, 0, 0);
  ellipse(mouseX, mouseY, 5, 5);
}

// Checks for collision on regular meteors
Cursor.prototype.checkForMeteorCollision = function(meteor) {
  if ((mouseIsPressed === true) && ((meteor.x >= this.x - meteorWidth/2) && meteor.x <= (this.x + meteorWidth/2)) && (meteor.y >= (this.y - meteorHeight/2) && meteor.y <= (this.y + meteorHeight/2)) && (this.y <= height - 180)) {
    meteor.y = height * 2;
    this.score += 10;
  }
}

// Checks for collision on fire meteors
Cursor.prototype.checkForFireMeteorCollision = function(fireMeteor) {
  if ((mouseIsPressed === true) && ((fireMeteor.x >= this.x - meteorWidth/2) && fireMeteor.x <= (this.x + meteorWidth/2)) && (fireMeteor.y >= (this.y - meteorHeight/2) && fireMeteor.y <= (this.y + meteorHeight/2)) && (this.y <= height - 180)) {
    fireMeteor.y = height * 2;
    this.score += 20;
  }
}

// Calls cursor to simplify similar parameters for regular meteors

let Meteor = function(x, y) {
  Cursor.call(this, x, y);
}

Meteor.prototype.show = function() {

  // The whole meteor
  fill(139,69,19);
  ellipse(this.x, this.y, meteorWidth, meteorHeight);

  // The holes on the meteor
  fill(105, 105, 105);
  ellipse(this.x - 10, this.y - 10, 15, 10);
  ellipse(this.x + 10, this.y - 5, 20, 12);
  ellipse(this.x - 10, this.y + 10, 12, 15);
}

// Calls cursor to simplify similar parameters for fire meteors

let FireMeteor = function(x, y) {
  Cursor.call(this, x, y);
}

FireMeteor.prototype.show = function() {

  // Flames on the meteor
  fill(255, 215, 0);
  triangle(this.x - 20, this.y - 15, this.x, this.y - 55, this.x + 20, this.y - 15);
  triangle(this.x - 35, this.y - 10, this.x - 30, this.y - 50, this.x + 25, this.y - 15);
  triangle(this.x, this.y - 25, this.x + 25, this.y - 50, this.x + 35, this.y - 5);

  // The whole meteor
  fill(255,165,0);
  ellipse(this.x, this.y, meteorWidth, meteorHeight);

  // The holes on the meteor
  fill(105, 105, 105);
  ellipse(this.x - 10, this.y - 10, 15, 10);
  ellipse(this.x + 15, this.y, 20, 25);
  ellipse(this.x - 10, this.y + 10, 12, 15);
}