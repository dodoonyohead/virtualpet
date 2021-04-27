class Food{
    constructor(){
        this.foodStock=null;
        this.lastFed=null;
        this.milkBottle=loadImage("images/Milk.png");
    }
    getFoodStock(){
        var databaseRef=database.ref("Food");
        databaseRef.on("value", function(data){
            this.foodStock=data.val();
        })
    }

    updateFoodStock(num){
        database.ref("/").update({
            Food:num
        })
    }

    deductFood(){
        this.foodStock-=1;
    }
    updateLastFed(lastFed){
        database.ref("/").update({
            fedTime:lastFed
        })
        
    }

    display(){
        var x=30,y=80;
        for(var i=0;i<foodStock;i++){
        if(i%10===0){
            x=30;
            y=y+45;
        }
        image(this.milkBottle,x,y,50,50)
        x=x+30;
        
        }
       

    }

    updateState(state){
        database.ref("/").update({
            gameState:state
        })
    }

    garden(){
        background(gardenImg);

    }
    washroom(){
        background(washroomImg);
    }
    bedroom(){
        background(bedroomImg);
    }
    LivingRoom(){
        background(livingRoomImg);
    }

}