let Ship = document.getElementById('Ship');
let GameContainer = document.getElementsByClassName('GameContainer')[0];
let Score = document.getElementById("Score");
let MagazineContainer = document.getElementById("Magazine");
let LivesContainer = document.getElementById("Lives");
let Obstacles = document.getElementsByClassName('Obstacle');


let ShipMoveSpeed = 5;
let ShipHorizontalPosition = 300;
let BulletHorizontalPosition =300;

Ship.style.left = `${ShipHorizontalPosition}px`;


function MoveShipAndBullet(event){
        switch(event.key){
            case "ArrowLeft":
                if(ShipHorizontalPosition>30){
                    ShipHorizontalPosition -=ShipMoveSpeed;
                    BulletHorizontalPosition -=ShipMoveSpeed
                }
     
                break;
            case "ArrowRight":
                if(ShipHorizontalPosition<570){
                    ShipHorizontalPosition+=ShipMoveSpeed;
                    BulletHorizontalPosition +=ShipMoveSpeed;
                }

                break;
        }
        Ship.style.left = `${ShipHorizontalPosition}px`;
        CheckLoss();
        
    }


document.addEventListener('keydown',MoveShipAndBullet);
let Magazine = 10;

function ShootBullet(event){
    if(event.key === " "){ 
        if(Magazine>0){
            let newBullet = document.createElement('div');
            newBullet.classList.add('Bullet');
            GameContainer.appendChild(newBullet);
            let BulletVerticalPosition  = 130;

            newBullet.style.bottom = `${BulletVerticalPosition}px`
            newBullet.style.left = `${BulletHorizontalPosition}px`
    
            let BulletInterval = setInterval(()=>{
                BulletVerticalPosition +=10;
                newBullet.style.bottom = `${BulletVerticalPosition}px`
                CheckCollision(newBullet,BulletInterval);
   
    
            },50);

            
        Magazine--;
        MagazineContainer.textContent = Magazine;
 
        }
    
    }
    
}
const LoadMagazine = setInterval(()=>{
    if(Magazine<10){
        Magazine++;
        MagazineContainer.textContent = Magazine;
    }
},2000)

document.addEventListener('keydown', ShootBullet);

let ObstacleSpeed = 50;
function CreateObstacles(){
    let RandomObstacleHorizontal = Math.floor(Math.random()*550);
    let Obstacle = document.createElement('div');
    Obstacle.classList.add('Obstacle');
    GameContainer.append(Obstacle);
    let RandomObstacleVertical = 0;
    Obstacle.style.top= `${RandomObstacleVertical}px`;
    Obstacle.style.left = `${RandomObstacleHorizontal}px`
    let ObstacleInterval = setInterval(()=>{
        RandomObstacleVertical+=5;
        Obstacle.style.top = `${RandomObstacleVertical}px`;
        if(RandomObstacleVertical>600){
            clearInterval(ObstacleInterval);
            Obstacle.remove();
        }

    },ObstacleSpeed
    )
    CheckLoss();


    
     
}
let CreateObstacle =setInterval(CreateObstacles, 500)

let Counter = 0;
function CheckCollision(bullet, Interval){

    for(let i=0; i<Obstacles.length; i++){
        let Obstacle = Obstacles[i];

        let BulletRect = bullet.getBoundingClientRect();
        let ObstacleRect = Obstacle.getBoundingClientRect();

        if(
            BulletRect.left < ObstacleRect.right &&
            BulletRect.right > ObstacleRect.left &&
            BulletRect.top < ObstacleRect.bottom &&
            BulletRect.bottom > ObstacleRect.top
        ){
            Counter++;
            console.log(Counter)
            Obstacle.remove();
            bullet.remove();
            clearInterval(Interval);    
            Score.textContent = `Twój wynik to: ${Counter}`;
            CreateBoss();
            
        }
        if(Counter>=10){
            ObstacleSpeed   = 40;
        }
        else if(Counter>=20){
            ObstacleSpeed = 30;

        }
        else if(Counter>=30){
            ObstacleSpeed = 20;

        }

    }

}

let Lives = 3;
function CheckLoss(Interval){
    for(let i=0;i<Obstacles.length;i++){
        let Obstacle = Obstacles[i];
        let ObstacleRect = Obstacle.getBoundingClientRect();
        let ShipRect = Ship.getBoundingClientRect();
        if(
            ShipRect.left < ObstacleRect.right &&
            ShipRect.right > ObstacleRect.left &&
            ShipRect.top < ObstacleRect.bottom &&
            ShipRect.bottom > ObstacleRect.top

        ){
            Lives--;
            LivesContainer.textContent = `Pozostałe życia ${Lives}`
            Obstacle.remove();


        }
        if(Lives===0){
            Score.textContent= "Przegrałes";
            Obstacle.style.display = "none";
            
        }


    }
}
let BossSpeed = 1000;
function CreateBoss(){
    if(Counter%2===0 && Counter!==0){
        for(let i=0;i<Obstacles.length;i++){
            let Obstacle = Obstacles[i];
            Obstacle.remove();
            clearInterval(CreateObstacle)
            
        }
        let RandomHorizontalBoss = Math.floor(Math.random()*550);
        let BossObstacle = document.createElement('div');
        BossObstacle.classList.add('Boss');
        GameContainer.appendChild(BossObstacle);
        let BossVerticalPosition = 0;
        BossObstacle.style.top= `${BossVerticalPosition}px`;
        BossObstacle.style.left = `${RandomHorizontalBoss}px`
        let BossInterval = setInterval(()=>{
            BossVerticalPosition+=5;
            BossObstacle.style.top = `${BossVerticalPosition}px`
        
        },100)

    }
    


}
