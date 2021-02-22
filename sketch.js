
var monkey, monkeyRunning;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, rockGroup;
var ground, invisibleGround;
var GameState;
var PLAY, END;

function preload() {

  monkeyRunning = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(500, 500);

  PLAY = 1;
  END = 0;
  GameState = PLAY;
  //Creating groups
  bananaGroup = new Group();
  rockGroup = new Group();
  //Creating sprites
  monkey = createSprite(70, 370, 50, 50);
  monkey.addAnimation("runningMonkey", monkeyRunning);
  monkey.scale = 0.1;

  ground = createSprite(250, 405, 1000, 10);
  ground.x = ground.width / 2;
  
  invisibleGround = createSprite(250, 410, 1000, 10);
  invisibleGround.x = ground.width / 2;
}


function draw() {
 
  background("lightblue");

  if (GameState === PLAY) {


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
   
    if (keyDown("space") && monkey.isTouching(ground) ) {
      monkey.velocityY = -20;
    }  
    //Adding score
    score = Math.round(frameCount / 3);
    
    if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
  }
 
   food();
   obstacle();

    if (monkey.isTouching(rockGroup)) {
      GameState = END;
    }
} 
  
  if (GameState === END) {
    ground.velocityX = 0;
    rockGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    bananaGroup.setLifetimeEach(-1);
    rockGroup.setLifetimeEach(-1);
  }



  monkey.velocityY = monkey.velocityY + 0.9;
  monkey.collide(invisibleGround);
 

  text("Survial time :" + score, 250, 50);
  
  obstacle.depth=ground.depth
  ground.depth=ground.depth+1;
  
  drawSprites();
}

function food() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(500, 10, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(5 + 2 * score / 100);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    bananaGroup.add(banana);
    bananaGroup.setLifetimeEach(100);
    banana.setCollider("rectangle", 0, 0, 400, 400);

  }

}

function obstacle() {

  if (frameCount % 300 === 0) {
    var obstacle = createSprite(500, 370, 23, 32);
    obstacle.velocityX = -(5 + 2 * score / 100);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    rockGroup.add(obstacle);
    rockGroup.setLifetimeEach(100);
    obstacle.setCollider("circle", 0, 0, 200)
  }

}