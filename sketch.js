var player, playerIMG, playerShootIMG;
var scene1, scene2;
var enemy, enemyIMG;
var Arrow, ArrowIMG;
var ground, backgroundIMG;
var EnemyGroup, ArrowGroup;
var gameState = "wait";
var playIMG, gameOver, gameOverIMG;
var scene1IMG, scene1;
var button;
var scene3, scene3IMG;
var yes;
var score = 0;

function preload(){
  playerShootIMG = loadAnimation("images/1.png","images/2.png","images/3.png","images/4.png","images/5.png","images/6.png");
  playerIMG = loadImage("images/player.png");
  enemyIMG = loadAnimation("images/e1.png","images/e2.png","images/e3.png","images/e4.png","images/e5.png","images/e6.png");
  backgroundIMG = loadImage("images/bg.png");
  ArrowIMG = loadImage("images/Arrow.png");
  playIMG = loadImage("images/Play.png");
  scene1IMG = loadImage("images/bg2.jpg");
  // gameOverIMG = loadImage("images/gameOver.png");
  scene3IMG = loadImage("images/GameOver.jpg");
}

function setup() {
  createCanvas(1500,800);

  // scene1 = createSprite(730,350);
  // scene1.addImage(scene1IMG);
  // scene1.scale = 0.8;

  yes = createSprite(600,700,400,200);
  yes.visible = false;

  button = createSprite(750, 350);
  button.addImage(playIMG);

  EnemyGroup = createGroup();
  ArrowGroup = createGroup();
}

function draw() {
  background(scene1IMG);

  if(mousePressedOver(button)){
    gameState = "start";
    button.visible = false;
  }

  if(gameState === "start"){
    // if(backgroundIMG)
      background(backgroundIMG);
    // scene2 = createSprite(730,350);
    // scene2.addImage(backgroundIMG);
    // scene2.scale = 2;

    ground = createSprite(900, 680, 1800,10);
    ground.shapeColor="brown";
    ground.visible = false;

    player = createSprite(100, 555, 50, 50);
    player.addImage(playerIMG);
    player.scale=2;

    textSize(35);
    fill("Black")
    text("Score: "+score,650,150);

    spawnEnemy();

  if(keyWentDown("space")){
    Arrow = createSprite(150,555,10,10);
    Arrow.addImage(ArrowIMG);
    Arrow.scale = 2;
    Arrow.velocityX = 7;
    ArrowGroup.add(Arrow);
  }

  for(var i=0;i<EnemyGroup.maxDepth();i++){
    var getEnemy=EnemyGroup.get(i);

    if(getEnemy && EnemyGroup.isTouching(ArrowGroup)){

      if(getEnemy.isTouching(ArrowGroup)){
        ArrowGroup.destroyEach();
      }
      getEnemy.destroy();
      score = score+100;
    }
  }

  if(EnemyGroup.isTouching(player)){ 
    gameState = "end";
  }

  }

  if(gameState === "end"){
    //background(scene3IMG);

    EnemyGroup.setVelocityXEach(0);
    EnemyGroup.setLifetimeEach(-1);

    ArrowGroup.setVelocityXEach(0);

    background(backgroundIMG);

    gameOver = createSprite(750,350,100,10);
    gameOver.addImage(scene3IMG);
    gameOver.scale = 1.2;

    if(mousePressedOver(yes)){
      reset();
    }

    // stroke("Red");
    // fill("red");
    // textSize(50);
    // text("Game Over", 650, 350);
  }

  drawSprites();
  textSize(30);
  fill("white");
  text(mouseX + "," + mouseY,30,30);
}

function spawnEnemy(){
  if(frameCount%100 === 0){
    enemy = createSprite(1500,575,10,10);
    enemy.addAnimation("enemy", enemyIMG);
    enemy.velocityX = -5;
    enemy.lifetime = 300;
    EnemyGroup.add(enemy);
  }
}

function reset(){
  gameState = "start";

  background(backgroundIMG);
  
  EnemyGroup.destroyEach();
  ArrowGroup.destroyEach();

  score = 0;
}