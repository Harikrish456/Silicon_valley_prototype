var bgImg;
var planeImg;
var player;
var bg;
var obstacleGroup;
var obstacleGroup2;
var gameState = "PLAY";
var Img1;
var Img2;
var Img3;
var Img4;
var Img5;
var Img6;
var reset;
var score = 0;
var attempts = 0;
var pointSound;
var hitSound;
var help;
var back;
var rod;
var rod2;
var rod3;
var backImg;
var spaceSound;
var helpImg;
var resetText;
var resetImg;
var scoreText;
var scoreImg;
var attemptsText;
var attemptsImg;
var gameOverText;
var gameOverImg;
var helpBgImg;
var rand;
var round;
var pointScore1;
var pointScore2;


function preload(){
    bgImg = loadImage("images/background.jpg");
    planeImg = loadImage("images/plane.png");  
    Img1 = loadImage("images/randonBuilding.png");
    Img2 = loadImage("images/burjKhalifa.png");
    Img3 = loadImage("images/empireBuilding.png");
    Img4 = loadImage("images/randomUpsideBuilding.png");
    Img5 = loadImage("images/upsideBurjKhalifa.png");
    Img6 = loadImage("images/upsideEmpireBuilding.png");
    pointSound = loadSound("Sounds/sfx_point.wav");
    hitSound = loadSound("Sounds/sfx_die.wav");
    backImg = loadImage("images/arrow.png");
    //spaceSound = loadSound("Sounds/sfx_swooshing.wav");
    helpImg = loadImage("images/help.png");
    upsideBurjImg = loadImage("images/upsideBurjKhalifa.png");
    upsideEmpireImg = loadImage("images/upsideEmpireBuilding.png");
    resetImg = loadImage("images/reset.png");
    scoreImg = loadImage("images/score.png");
    gameOverImg = loadImage("images/gameOver.png");
    attemptsImg = loadImage("images/attempts.png");
    helpBgImg = loadImage("images/helpBg.jpg");
}

function setup(){
    createCanvas(displayWidth,displayHeight);

    bg = createSprite(displayWidth/2,displayHeight/2,displayWidth + 200 ,displayHeight);
    bg.addImage(bgImg);
    bg.scale = 3.6;
    bg.x = bg.width/2;
    bg.velocityX = -5;

    obstacleGroup = createGroup();
    obstacleGroup2 = createGroup();

    player = createSprite(800,200,40,40);
    player.addImage(planeImg);
    player.velocityY = 2;
    player.scale = 0.3;
    player.setCollider("circle",0,0,30);

    help = createSprite(150,250,30,10);
    help.addImage(helpImg);
    help.scale = 0.2;
    help.visible = false;

    back = createSprite(200,200,50,20);
    back.visible = false;
    back.scale = 0.4
    back.addImage(backImg);

    rod = createSprite(displayWidth/2,displayHeight/2,displayWidth,150);
    rod.visible = false;

    rod2 = createSprite(displayWidth/2,- 350,displayWidth,20);

    rod3 = createSprite(displayWidth/2, displayHeight + 350, displayWidth, 20);

    scoreText = createSprite(150,210,70,10);
    scoreText.addImage(scoreImg);

    resetText = createSprite(displayWidth/2, displayHeight/2, 70, 10);
    resetText.addImage(resetImg);
    resetText.visible = false;

    gameOverText = createSprite(displayWidth/2, displayHeight/2 + 70,70,10);
    gameOverText.visible = false;
    gameOverText.addImage(gameOverImg);
    gameOverText.scale = 0.5;

    attemptsText = createSprite(displayWidth - 300, displayHeight - 100,70,10);
    attemptsText.addImage(attemptsImg);
}

function draw(){
    background("white");
 rand = random(1,3);
     round = Math.round(rand);
    Math.round();
    console.log(round);

    if(gameState === "PLAY"){

        help.visible = true;
    if(bg.x < 0){
    bg.x = bg.width/2;
    }

    if(keyDown("space") || keyDown(UP_ARROW)){
    player.velocityY = -9; 
    }

    player.velocityY = player.velocityY + 1;

    addObstacles();
    addObstacles2();

    if(player.isTouching(obstacleGroup)||player.isTouching(obstacleGroup2)){
        gameState = "END";
        hitSound.play();
    }

    if(frameCount % 60 === 0){
        score = score + 1;
        pointSound.play();
    }

    if(player.y < 0){
        gameState = "END";
        hitSound.play();
    }

    if(player.y > displayHeight){
        gameState = "END";
        hitSound.play();
    }
    console.log(displayHeight);


    }
    
    if(mousePressedOver(help)){
        gameState = "HELP";
    }

    drawSprites();
    textSize(50);
    stroke("black");
    fill("black");
    text(score,240,170);
    text(attempts,displayWidth - 100,displayHeight - 150);
 

    if(gameState === "END"){
        player.velocityY = 0;
        resetText.visible = true;
        gameOverText.visible = true;

        player.velocityX = 0;
        player.x = 200;
        player.y = 600;
        player.visible = false;
        obstacleGroup.destroyEach();
        obstacleGroup2.destroyEach();
        bg.velocityX = 0;

       
    }

    if(keyWentDown("r")){
        player.velocityY = 2;
        player.y = 200;
        resetText.visible = false;
        gameOverText.visible = false;
        player.x  = displayWidth/2;
        bg.velocityX = -3;
        player.visible = true;
        gameState = "PLAY";  
        score = 0;   
        attempts = attempts + 1;
    }

    if(mousePressedOver(back)){
        gameState = "PLAY";
        resetText.visible = false;
        gameOverText.visible = false;
        back.visible = false;
        player.x = displayWidth/2;
        score = 0;
        player.visible = true;
        player.y = 200;
      }

    if(gameState === "HELP"){
        player.velocityY = 0;
        obstacleGroup.setVelocityYEach(0);
        obstacleGroup2.setVelocityYEach(0);
        bg.velocityY = 0;
        background(helpBgImg);
        stroke("red");
        fill("red");
        textSize(60);
        text("Use space bar to go up", 50, displayHeight/2);
        text("Avoid the buildings", 50, displayHeight/2 + 100);
        text("Don't go out of the screen", 50, displayHeight/2 + 200);
        textSize(18);
        text("BACK", 175, 240);
        textSize(30);
        fill("pink");
        stroke("pink");
        text("Enjoy the game! Try to get to a 100!", displayWidth/2 + 100, displayHeight/2 + 100);
        back.visible = true;
        back.display();
      }

    createEdgeSprites();
    obstacleGroup2.bounceOff(rod2);
    obstacleGroup.bounceOff(rod);
   obstacleGroup.bounceOff(rod3);
    obstacleGroup2.bounceOff(rod);    

}

function addObstacles(){
    if(World.frameCount % 50 === 0){
    var obstacle = createSprite(displayWidth,displayHeight);
    obstacle.velocityX = -5;
    obstacle.velocityY = -1;    
    obstacle.setCollider("rectangle",0,0,obstacle.width,600);
    obstacle.scale = 1;
    switch (round){
        case 1: obstacle.addImage(Img1);
        break;
        case 2: obstacle.addImage(Img2);
        break;
        case 3: obstacle.addImage(Img3);
        break;
    }
    console.log(obstacle.width);
    obstacleGroup.add(obstacle);
    }
  }
  
  function addObstacles2(){
    if(World.frameCount % 50 === 0){
    var obstacle2 = createSprite(displayWidth,-30,50,500);
    obstacle2.velocityX = -5;
    obstacle2.velocityY = 1;
    obstacle2.scale = 1;
    //obstacle2.setCollider("rectangle",0,0,obstacle2.width,600);
    switch (round){
        case 1: obstacle2.addImage(Img4);
        break;
        case 2: obstacle2.addImage(Img5);
        break;
        case 3: obstacle2.addImage(Img6);
        break;
    }
    obstacleGroup2.add(obstacle2);
    }
  }
  


    
