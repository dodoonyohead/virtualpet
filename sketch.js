var foodS, foodStock, dog, happyDog, database, milkBottle,milk=[];
var food,fedTime,lastFed,foodObj,FeedDog,AddFood,nextFedTime=0;
var gameState,currentTime;
var gardenImg,washroomImg,bedroomImg,sadImage,livingRoom;

function preload(){
  dogImg=loadImage("images/dogImg1.png");
  happyDog=loadImage("images/dogImg.png");
  bedroomImg=loadImage("petImages/BedRoom.png");
  washroomImg=loadImage("petImages/Wash Room.png");
  gardenImg=loadImage("petImages/Garden.png");
  sadImage=loadImage("petImages/Lazy.png");
  livingRoomImg=loadImage("petImages/Living Room.png")
  
}

function setup() {
  createCanvas(500, 500);
  
  database=firebase.database();
  var gameStateRef=database.ref("gameState");
  gameStateRef.on("value",function(data){
    gameState=data.val();
  })

  var databaseRef=database.ref('Food');
  databaseRef.on("value",readStock);
  
  dog=createSprite(250,350);
  dog.addImage(dogImg);
  dog.scale=0.25;
  food=new Food();

  
  FeedDog=createButton("Feed the dog");
  FeedDog.position(700,130);

  AddFood=createButton("Add Food");
  AddFood.position(700,160);

}


function draw() {  
  background(46,139,87);

  if(foodStock!==undefined){
    if(gameState==="hungry"){

      food.display();
      FeedDog.mousePressed(function(){
        dog.addImage(happyDog);
        writeStock(foodStock); 
        lastFed=hour();
        food.updateLastFed(lastFed);
        food.updateState("feeding");
      })
      FeedDog.mouseReleased(function(){
        dog.addImage(dogImg);
        
      })
    

      AddFood.mousePressed(function(){
        food.updateFoodStock(20)
      })
      
      textSize(15);
      fill(0);
      text("Press UP_ARROW key to Feed the Drago Milk ",20,30);

      stroke("Black");
      fill("brown");
    
      text("Food Stock: " + foodStock,350,70);
    }
    currentTime=hour();
    if(currentTime===lastFed+1){
      food.garden();
      food.updateState("playing");
    }
    else if(currentTime===lastFed+2){
      food.bedroom();
      food.updateState("sleeping");
    }
    else if(currentTime===lastFed+3){
      food.washroom();
      food.updateState("bathing");
    }
    else if(currentTime===lastFed+4){
      food.LivingRoom();
      food.updateState("livingRoom");
    }
    else{
      food.updateState("hungry");
      FeedDog.show();
      AddFood.show();
      //dog.addImage(sadImage);
    }
    if(gameState!=="hungry"){
      dog.remove();
      FeedDog.hide();
      AddFood.hide();
    }
    drawSprites();
  }
  var databaseRef=database.ref("fedTime");
  databaseRef.on("value",function(data){
    lastFed=data.val();
  })
  textSize(15);
  noStroke();
  fill(0)
  text("Last Fed: "+lastFed,20,450);
  nextFedTime=lastFed+4;
  
  if(nextFedTime>24){
    nextFedTime=nextFedTime-24;
  }
  text("Next fed time: "+nextFedTime,20,475);
 
}

function readStock(data){
    foodStock=data.val();
 
}

function writeStock(num){
  
  if(num<=0){
    num=0;
  }
  else{
    num=num-1;
  }
  database.ref('/').update({
    Food:num
  })

}

