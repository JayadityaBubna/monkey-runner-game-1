var monkey,bananagroup,stonegroup,background1,score,backgroundimg,monkeyimg,bananaimg,stoneimg,ground,PLAY,END,gamestate,lives,monkeydead

function preload(){
monkeyimg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

backgroundimg=loadImage("jungle.jpg");
bananaimg=loadImage("banana.png");
stoneimg=loadImage("stone.png");
monkeydead=loadImage("Monkey_01.png");
}

function setup() {
  //creating canvas
  createCanvas(400, 400);
  
  //creating background,adding image and giving it a scale and speed
  background1=createSprite(0,0,500,500);
  background1.addAnimation("background1",backgroundimg);
  background1.scale=1.3;
  background1.x=background1.width/2;
  background1.velocityX=-6;
  
  //creating an invisible ground and giving it a speed
  ground=createSprite(200,380,800,10);
  ground.visible= false;
  ground.velocityX=-6;
  
  //creating a monkey, giving it an image and scale
  monkey=createSprite(30,380,10,10);
  monkey.addAnimation("monkey",monkeyimg);
  monkey.scale=0.15;
  
  //creating banana and stone groups
  bananagroup=new Group();
  stonegroup=new Group();
  
  //creating game states,score and life
  gamestate = 1;
  PLAY = 1;
  END = 0;
  score=0;
  lives=3;

}

function draw() {
  
  background(220);
  
  //making themonkey collide with the ground
  monkey.collide(ground);
  
  
  if (gamestate === PLAY) {

    
    //making the monkey jump
    if(keyDown("space") && monkey.y>=329){
    monkey.velocityY=-20;
  }
    //adding gravity
    monkey.velocityY=monkey.velocityY+1;
    
    //spawning banana and obstacles
    banana();
    stone();
    
    //making infinite background
    if (background1.x < 0) {
      background1.x = background1.width / 2;
    }
    
    //making infinite ground
    if(ground.x<0){
     ground.x=ground.width/2
    }
    
    //increasing score and scale if monkey is touching banana
    if(monkey.isTouching(bananagroup)){
    score=score+2;
   
    bananagroup.destroyEach();
    }
    
    switch (score) {
      case 10:
      monkey.scale = 0.17;
      break;
      
      case 20:
      monkey.scale = 0.19;
      break;
      
      case 30:
      monkey.scale = 0.21;
      break;
      
      case 40:
      monkey.scale = 0.23;
      break;
      
      default:
      break;
    }

    if(monkey.isTouching(stonegroup)){
    stonegroup.destroyEach();
      lives=lives-1;
    }
    switch(lives){
      case 2:
      monkey.scale=0.06
      break;
      
      case 1:
      monkey.scale=0.04
      break;
        
      case 0:
      gamestate=END;
      }
    
    }
  
  else if(gamestate===END){
    bananagroup.destroyEach();
    bananagroup.setVelocityXEach(0);
    bananagroup.setVelocityYEach(0);
    stonegroup.destroyEach();
    stonegroup.setVelocityXEach(0);
    stonegroup.setVelocityYEach(0);
    background1.velocityX=0;
    ground.velocityY=0;
    monkey.scale=0.15;
    text("GAME OVER",200,200);
    monkey.addImage("monkey",monkeydead);
  }
  
  
 //confirming to draw sprites
  drawSprites();
  
  //making the text look good
  stroke("white");
  textSize(20);
  fill("white");
  
  //making a score and lifetime
  text("SCORE:"+ score,0,40);
  text("LIVES:"+ lives,200,40);
  
  
}

function banana(){
if(frameCount % Math.round(random(100,150))===0){

  //creating a banana at specific framecounts
  var       banana=createSprite(Math.round(random(100,300)),Math.round(random(100,300)),10,10);
  
  //giving an animation to the banana
  banana.addImage("banana",bananaimg);
  
  //giving it a speed,lifetime and scale
  banana.velocityX=-6;
  banana.lifetime=400;
  banana.scale=0.08;
  
  //adding it to its group
  bananagroup.add(banana);
   }
}

function stone(){
if(frameCount % Math.round(random(100,150))===0){

  //creating a banana at specific framecounts
  var stone=createSprite(Math.round(random(100,300)),360,10,10);
  
  //making the stone collide with the ground
  stone.collide(ground);
  
  //giving an animation to the banana
  stone.addImage("stone",stoneimg);
  
  //giving it a speed,lifetime and scale
  stone.velocityX=-6;
  stone.lifetime=400;
  stone.scale=0.2;
  
  //adding it to its group
  stonegroup.add(stone);
   }

}

