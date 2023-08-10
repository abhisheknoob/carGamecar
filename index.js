const score = document.querySelector('.score');
const startScreen=document.querySelector('.startScreen');
const GameArea=document.querySelector('.GameArea');
// console.log(GameArea)

let keys={
    ArrowUp:false,
    ArrowLeft:false,
    ArrowDown:false,
    ArrowRight:false
}

let player={
    speed:8,
    score:0
};


const keyDown=(e)=>{
    keys[e.key]=true
    e.preventDefault()
    //  console.log(keys)
//    console.log(e.key)
}
const keyUp=(e)=>{
    keys[e.key]=false
    e.preventDefault()
//    console.log(e.key)
}
const movelines=()=>{
    let lines=document.querySelectorAll('.line') 
    lines.forEach((item)=>{
        if(item.y>=900){
            item.y-=900
        }
      item.y+=player.speed;
      item.style.top= item.y+'px'
    })
}

const isCollide=(a,b)=>{
    aRect=a.getBoundingClientRect()
    bRect=b.getBoundingClientRect()
    return ! ((aRect.top>bRect.bottom)|| (aRect.bottom<bRect.top)||(aRect.right<bRect.left)||(aRect.left>bRect.right))
  }

   function endGame(){
    player.start=false
    startScreen.classList.remove('hide')
    startScreen.innerHTML='great job your score is '+player.score + ' '+'tap to play again'
   }
const moveEnemy=(car)=>{
    let enemy=document.querySelectorAll('.enemy') 
    enemy.forEach((item)=>{

      if( isCollide(car,item) )  {
        // console.log('hit')
        endGame()
      }
        if(item.y>=900){
            item.y-=910
            item.style.left=Math.floor(Math.random()*330)+'px'
        }
      item.y+=player.speed;
      item.style.top= item.y+'px'
    })
}




const gamePlay=()=>{
    let car=document.querySelector('.car')
    movelines()
    moveEnemy(car)
    // console.log('hey i am clicked ')
   
    let road=GameArea.getBoundingClientRect();
    // console.log(road)
    if(player.start){
        if(keys.ArrowUp&&player.y>(road.top+140)){
            player.y-=player.speed
        }
        if(keys.ArrowDown && player.y<(road.bottom-0)){
            player.y+=player.speed
        }
        if(keys.ArrowLeft && player.x>0){
            player.x-=player.speed
        }
        if(keys.ArrowRight && player.x<(road.width-50)){
            player.x+=player.speed
        }

        car.style.top=player.y+'px'
        car.style.left=player.x+'px'
        window.requestAnimationFrame(gamePlay)
        // console.log(player.score++)
        player.score++
        score.innerHTML= 'score:'+player.score;
    }
   
}
const start=()=>{

    // GameArea.classList.remove('hide');
    GameArea.innerHTML='';
    startScreen.classList.add('hide')
    player.start=true
    player.score=0
    window.requestAnimationFrame(gamePlay)
    let car= document.createElement('div');
    car.setAttribute('class','car');

 
    // car.innerText='hey i am car'
    GameArea.appendChild(car)
    for(i=0;i<6;i++){

        let roadLine=document.createElement('div');
        roadLine.setAttribute('class','line');
        roadLine.y=(i*150)
        roadLine.style.top= roadLine.y+'px'
        GameArea.appendChild(roadLine)
    
    }


    player.x=car.offsetLeft;
    player.y=car.offsetTop;
    // console.log( 'from top'+ car.offsetTop)
    // console.log('from left'+car.offsetLeft)

    for(i=0;i<4;i++){

        let enemyCar=document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y=((i+1)*350)*-1
        enemyCar.style.top= enemyCar.y+'px'
        // enemyCar.style.background='blue'
        enemyCar.style.backgroundImage = "url('image/enemy\ car\ 1.jpg')"
        enemyCar.style.backgroundSize = "cover"; // or "contain", "100%", etc.
        enemyCar.style.backgroundRepeat = "no-repeat";
        enemyCar.style.backgroundPosition = "center center";
        // enemyCar.style.backgroundImage = "filter( blur:(10px))";
        enemyCar.style.left=Math.floor(Math.random()*330)+'px'
        GameArea.appendChild(enemyCar)
    
    }
}
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup',keyUp);
startScreen.addEventListener('click',start);

