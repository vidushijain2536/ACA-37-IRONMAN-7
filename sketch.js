// declaration of global variables
var bg, backgroundImg;
var ironman,man;
var rockImg,rockGroup;
var diamondGroup,diamondImg;
var score=0;
var spikeGroup,spikeImg
var state="play"
// preload is used to load assets
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironman = loadImage("images/iron.png")
  rockImg = loadImage("images/stone.png");
  diamondImg= loadImage("images/diamond.png")
  spikeImg =loadImage("images/spikes.png")
  restartImg = loadImage("images/restart.png")
}

function setup() {
  //creating background sprite
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg)
  // creating iron man sprite
  man =createSprite(100,500)
  man.addImage(ironman)
  man.scale=0.3
  //creating ground sprite
  ground = createSprite(200,585,2000,10);
  ground.visible =false;
  man.setCollider("rectangle",10,10,300,300);
  rockGroup=new Group();
  diamondGroup=new Group();
  spikeGroup=new Group();
  restart= createSprite(500,300)
  restart.addImage(restartImg)
  restart.visible=false
 
}

function draw() {
  if (state==="play"){
  
  //making ironman move up with up arrow
     if (keyDown("up")){
       // making ironman move left with left arrow
     man.velocityY = -10;}
    if (keyDown("left")){
      man.x = man.x -7;
    }
     //making ironman move right with right arrow
    if (keyDown("right")){
      man.x = man.x+7;}

    //gravity
  man.velocityY = man.velocityY + 0.5
  //making iron man collide with the ground
  man.collide(ground)
  //making background move
  bg.velocityY=-10;
  if (bg.y<200){
    bg.y=bg.width/4;}

   // calling function to generate diamonds
    generateDiamonds();
    // making iron man touch the diamond
    for(var i = 0 ; i < (diamondGroup).length;i++){
     temp=(diamondGroup).get(i);
    if(temp.isTouching(man)){
        score++;
        temp.destroy();
        temp=null;
      }

      
    }
    //calling function to generate spikes
    generatespike();
    // making iron man touch the spikes
    for(var i = 0 ; i< (spikeGroup).length ;i++){
      var temp = (spikeGroup).get(i) ;
      
      if (temp.isTouching(man)) {
        score=score-5;
        temp.destroy();
        temp=null;
        }
          
      }

     //calling function to generate rocks 
    generaterock ();
    //making iron man touch the rock 
for (var i = 0; i <rockGroup.length; i++){
      var temp = rockGroup.get(i);
      if(temp.isTouching(man)){
        man.collide(temp);
      }
      if(score<=-10 || man.y>610)
        {
        state="end"
      }
}}

else if (state==="end"){
  bg.velocityY=0
man.velocityX=0
man.velocityY=0
rockGroup.setVelocityYEach(0)
diamondGroup.setVelocityYEach(0)
spikeGroup.setVelocityYEach(0)
spikeGroup.setLifetimeEach(-1)
rockGroup.setLifetimeEach(-1)
diamondGroup.setLifetimeEach(-1)
restart.visible=true

}
 if(mousePressedOver(restart)){
    restartGame();
  }
    
    drawSprites();
    textSize(20)
    fill("red")
   text("Diamonds Collected "+score,500,50);
}
//to generate infinite rocks
function generaterock(){
  if ( frameCount % 70 ===0){
    var rock = createSprite(120,120,40,10);
    rock.x=random(50,450);
    rock.addImage(rockImg);
    rock.scale =1;
    rock.velocityY= 5;
    rockGroup.add(rock);
    
  }

}
//to generate infinite diamonds
function generateDiamonds(){
  if (frameCount % 50 === 0) {
    var diamond = createSprite(1200,120,40,10);
    diamond.addImage(diamondImg)
    diamond.x = Math.round(random(80,400));
    diamond.scale = 0.5;
    diamond.velocityY= 3;
    diamond.lifetime = 1200;
    diamondGroup.add(diamond);
  }

}

// to generate infinite spikes
function generatespike(){
  if(frameCount % 150 === 0){
    var spike = createSprite(1200,100,10,40);
    spike.addImage(spikeImg);
    spike.x = random(50, 850);
    spike.velocityY = 4;
    spike.scale=0.7;
     
   spikeGroup.add(spike);
   spike.lifetime=600;
  
    }
  }
  function restartGame(){
state="play"
diamondGroup.destroyEach();
rockGroup.destroyEach();
spikeGroup.destroyEach();
man.y=50
score=0
restart.visible=false

  }



