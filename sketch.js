var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh;

function preload(){
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}

function setup() {
  score=0;
  createCanvas(600, 600);
  
  knife=createSprite(40,200,20,20);
  knife.addImage(knifeImage);
  knife.scale=0.7
  knife.setCollider("rectangle",0,1,40,60);

  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    fruits();
    Monster();
    
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();
      score=score+2;

    }
    else
    { if(monsterGroup.isTouching(knife)){
        gameState=END;
        //gameover sound
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
    }
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.x = 0    
    fruit.velocityX= (7+(score/4));
    fruit.scale=0.2;
    fruit.y=Math.round(random(50,550));
    fruit.setLifetime=100;
  
     f = Math.round(random(1,12));
    if (f == 1 || f == 5 || f == 9) {
      fruit.addImage(fruit1);
    } else if (f == 2 || f == 6 || f == 10) {
      fruit.addImage(fruit2);
    } else if (f == 3 || f == 7 || f == 11) {
      fruit.addImage(fruit3);
    } else if (f == 4 || f == 8 || f == 12){
      fruit.addImage(fruit4);
    }
    fruitGroup.add(fruit);
  }
}
