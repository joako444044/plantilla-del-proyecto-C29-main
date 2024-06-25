const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var btn_axe, btn;
var stones = [];
var back;
var zombie;
var animation1, animation2;
var squashed;
function preload(){
  back = loadImage("./assets/background.png");
  squashed = loadImage("./squashed zombie.png")
  animation1 = loadAnimation("./assets/zombie1.png","./assets/zombie2.png");
  animation2 = loadAnimation("./assets/zombie3.png","./assets/zombie4.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  zombie = createSprite(width / 2, height - 70);
  zombie.X = width / 2;
  zombie.scale = 0.05;
  zombie.addAnimation("right",animation1);
  zombie.addAnimation("left",animation2);
  zombie.addImage("sad",squashed)
  zombie
  ground = new Base(0, height - 10, width * 2, 20, "#795548", true);
  leftWall = new Base(50, height / 2 + 20, 220, 100, "#8d6e63", true);
  rightWall = new Base(width - 50, height / 2 + 20, 220, 100, "#8d6e63", true);
  
  bridge = new Bridge(29, { x: width / 2 - 800, y: height / 2 - 70});
  jointPoint = new Base(width - 130, height / 2 - 30, 40, 20, "#8d6e63", true);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 100);
    var sizw = random (10,90);
    var stone = new Stone(x, y, sizw, sizw);
    stones.push(stone);
  }

btn_axe = createImg("./assets/axe.png");
btn_axe.position(width - 150, height / 2 - 30);
btn_axe.size(70,70);
btn_axe.mouseClicked(cut);
zombie.velocityX = 5;


}

function draw() {
  
  Engine.update(engine);
  image(back,0,0,width,height);
  
  push();
  translate(width - 150, height / 2 - 30);
  ellipseMode(CENTER);
  ellipse(35,35,70)
  fill("gray");
  noStroke()
  pop();
  if (zombie.x > width * 0.85){
    zombie.changeAnimation("left");
    zombie.velocityX = -5;
  }else if(zombie.x < width * 0.15){
    zombie.changeAnimation("right");
    zombie.velocityX = 5;
  }
  ground.show();
  bridge.show();
  stroke("black");
  //leftWall.show();
  //rightWall.show();
 
  for (var stone of stones) {
    
    stone.show();
    if (colisiono(zombie,stone.body )){
    zombie.velocityX = 0;
    zombie.changeImage("sad");
    Matter.Body.setVelocity(stone.body,{x:10,y:-10});
    zombie.y = height - 30;
    }
  }

drawSprites();


}
function cut(){
   
   jointLink.remove();
   setTimeout(function(){
    bridge.break();
   },2500);
}

function colisiono(obj1,obj2){
comprove = dist(obj1.position.x,obj1.position.y,obj2.position.x,obj2.position.y);
if (comprove <= 20){
  return true;
}else{
  return false;
}
}