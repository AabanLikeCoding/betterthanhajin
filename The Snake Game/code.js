/* video : https://www.youtube.com/watch?v=baBq5GAL0_U&list=PLnKe36F30Y4bLhA-st9sC4ZthyV7nsL2Q&index=18 */

let blockSize = 25 ;
let rows = 12 ; 
let columns = 20 ; 

let board; 
let context; 


/* snake head*/
let snakeX = blockSize*5; 
let snakeY = blockSize*5;
let snakeSize =blockSize/2;

/* snake body */
let snakeBody = [];


/* food */

let foodX;
let foodY;
let foodSize = blockSize/2;

let velocityX= 0 ;
let velocityY = 0;
let acceleration = 8 ;

let score = 0 ;
let score_text;
let foodCounter = 0 ; //each 5 foods , increase accerelation by 5 
let FruitDrawn =false;
let img ;
let replayImg;


/* game control */
game_pause = false;

window.onload = function(){
    startTheGame();
}

function startTheGame(){

  /* load all the FRUIT images at first to ensure that no loading time occur while playing */ /* https://stackoverflow.com/questions/9892540/images-not-loading-properly */

  let images =9; //num of images
  let loaded = 0;  
  let imagesPath = ['images/StartGame.png','images/startButton.png'];

  loadImages();

    function loadImages(){

        for(let i=0;i<images;++i){
        let tmp = new Image;
        tmp.onload = function(){loaded++;  if(loaded==images){finish();}};
        tmp.src = `images/fruits/${i+1}.png`;
        }

        loaded =0;
        for(let i=0;i<imagesPath.length;++i){
            let tmp1 = new Image;
            tmp1.onload = function(){loaded++; if(loaded==imagesPath.length){finish();}};
            tmp1.src = imagesPath[i];
        }
    }

    function finish(){
        console.log("finish loading");
    }


    
    gameBoard =  document.getElementById('gameBoard');
    startBanner = document.createElement('img');
    startBanner.id='startBanner';

    gameBoard.appendChild(startBanner);

    startButton = document.createElement('img');
    startButton.id='startGame';
    startButton.addEventListener("click",clickStart);
    gameBoard.appendChild(startButton);

  
}


function clickStart(){
    gameBoard.removeChild(startBanner);
    gameBoard.removeChild(startButton);
    setGame();

}



function setGame(){


    replayImg = new Image();
    replayImg.src="images/replay.png";

    board = document.getElementById("board");
    board.width = columns*blockSize;
    board.height = rows*blockSize;
    context = board.getContext("2d");   /*to draw on the board*//*https://www.w3schools.com/tags/ref_canvas.asp */
    

    /*score */
    score_text = document.getElementById("score");
    score_text.innerHTML= `score is : ${score}`;

    placeFood();
    img = new Image();  /* the image object for fruits  */

    document.addEventListener("keyup",changeDirection) ; /*keyUp - > is going to wait for you to press arrow key and once you let go of the key it will call the function "change direction" */
    //setInterval(update,1000/10); //call this function 10 times a second -> 100ms 
    /* to update the interval timing : https://www.tutorialspoint.com/how-to-change-the-time-interval-of-setinterval-method-at-runtime-using-javascript#:~:text=We%20can%20use%20this%20method,will%20define%20in%20the%20code. */
    intervalManager(true, update, 1000/acceleration ); //so as aceleration increase when taking more fruits, the game will move faster because the update function will be called with smaller time interval 
   


    pauseButton =  document.getElementById("pause");
    replayButton1=  document.getElementById("replay1");
}


function update(){

  
    context.clearRect(0, 0, board.width, board.height);  // clear the canvas for redrawing  /*https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing*/ 

    /* draw the board */
    context.strokeStyle = "green";
    context.lineWidth = 10;
    context.strokeRect(0,0,board.width,board.height);

    /* draw the food */
    if(!FruitDrawn){
        imgNum =  Math.floor(Math.random()*9)+1;
        FruitDrawn = true;
    }
   
    // context.fillStyle="red";
    // context.fillRect(foodX,foodY, foodSize, foodSize);

    img.src=`images/fruits/${imgNum}.png`;

    context.drawImage(img,foodX,foodY, foodSize*1.2, foodSize*1.2);
    

    /*check is snake touches the food*/
    if((Math.abs(snakeX-foodX) < snakeSize*2) && (Math.abs(snakeY-foodY)<snakeSize*2)){
        
        snakeBody.push([0,0]);  /* we push empty array because we will assign the numbers later in for loop */
        score += 5 ; 
        foodCounter++;

        if(foodCounter == 10){

            if(acceleration<17){
                acceleration = acceleration +1; 
            }
            foodCounter = 0;
            
            intervalManager(false, update, 1000/acceleration );
            intervalManager(true, update, 1000/acceleration );
        }

        FruitDrawn = false;
        placeFood();

        /*score */
        score_text.innerHTML= `score is : ${score}`;
    }


    /*adjust the body of the snake */

    for(let i = snakeBody.length-1 ; i>0 ;i --){
        snakeBody[i]=snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }

    /* draw the snake */
    context.fillStyle="yellow";
    snakeX += velocityX*snakeSize;
    snakeY += velocityY*snakeSize;
    context.fillRect(snakeX,snakeY,snakeSize,snakeSize);


    /*draw the body of snake */

    for(let i = 0 ; i < snakeBody.length  ; i++){
        context.fillStyle="green";
        context.fillRect(snakeBody[i][0],snakeBody[i][1],snakeSize,snakeSize);
    }


    /* check the death of the snake when touching boundries or itself */
    if(snakeX <0 || snakeX > (columns-0.5)*blockSize || snakeY<0 ||  snakeY > (rows-0.5)*blockSize ){
        GameOver();
    }

    for(let i = 0 ; i < snakeBody.length ;i++){
        if(snakeX==snakeBody[i][0] && snakeY == snakeBody[i][1]){
            GameOver();
        }
    }



}

function placeFood(){

    //math.random -> returns a num between 0-1 but not 1 , Math.random()*columns -> returns a num between 0-19

    /*we need to make sure that the fruit won't be on snake body */

    foodX = Math.floor(Math.random()*columns)*blockSize;
    foodY= Math.floor(Math.random()*rows)*blockSize;

    for(let i = 0 ; i < snakeBody.length ; i++){
        if(foodX==snakeBody[i][0] && foodY==snakeBody[i][1]){
            placeFood();
        }
    }
    


}

function changeDirection(e){  /* e is the KeyboardEvent or the pressed key */ 
    if(e.code=="ArrowUp" && velocityY != 1){   /*https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code */
        velocityX = 0 ; 
        velocityY = -1;
    }
    else if(e.code=="ArrowDown"&& velocityY != -1){
        velocityX = 0 ; 
        velocityY = 1;
    }
    else if(e.code=="ArrowRight" && velocityX != -1){
        velocityX = 1 ; 
        velocityY = 0;
    }
    else if(e.code=="ArrowLeft" && velocityX != 1){
        velocityX = -1 ; 
        velocityY = 0;
    }

}



/*********   game control  **********/


function GameOver(){
    
    intervalManager(false, update, 1000/acceleration );

    context.fillStyle="white";
    context.globalAlpha = 0.7; // https://stackoverflow.com/questions/10487882/html5-change-opacity-of-a-draw-rectangle
    context.fillRect(0,0,board.width,board.height);
    context.globalAlpha = 1.0;

    context.font = 'bold 4em VT323';
    context.fillStyle = 'black';
    context.textAlign = "center";
    context.fillText("Game Over", board.width/2 , board.height/3);  //https://fjolt.com/article/html-canvas-text  //https://www.w3schools.com/graphics/canvas_text.asp


    /*replay button */ //https://stackoverflow.com/questions/22909440/image-click-event-in-html5-canvas 

    context.drawImage(replayImg, board.width/2.4,board.height/2, board.width/6, board.height/5);
    board.addEventListener("click", clicked);

    /*check that the click on canvas was on the replay image */
    function clicked(e){
        e.preventDefault();
        let rect = board.getBoundingClientRect(); /*method returns the size of an element and its position relative to the viewport. */
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let widthofBoard = rect.right -rect.left ;  /* why can't we use board.width and board.height? because they are nor responsive , they are fixed numbers , while rect properties are responsive to viewport*/
        let heightofBoard =rect.bottom -rect.top ;
        
        if(x> widthofBoard/2.4 && x<(widthofBoard/2.4 + widthofBoard/6) && y>heightofBoard/2 && y<(heightofBoard/2 + heightofBoard/5 )){ //780 = 580+(200) <- image width
            gameReplay1();
        }
    }


    pauseButton.style.visibility = 'hidden';
    replayButton1.style.visibility = 'hidden';

    score_text.innerHTML= `GAME OVER, your final score is : ${score}`;

}



/* for game Pause */

function gamePause(){

    game_pause = !game_pause; 
    if(game_pause){
        pauseButton.src = "./images/resume.png"; 

        intervalManager(false, update, 1000/acceleration );

        
        context.fillStyle="white";
        context.globalAlpha = 0.7; // https://stackoverflow.com/questions/10487882/html5-change-opacity-of-a-draw-rectangle
        context.fillRect(0,0,board.width,board.height);
        context.globalAlpha = 1.0;

        context.font = 'bold 4em VT323';
        context.fillStyle = 'black';
        context.textAlign = "center";
        context.fillText("Game Paused", board.width/2 , board.height/2);  //https://fjolt.com/article/html-canvas-text  //https://www.w3schools.com/graphics/canvas_text.asp


    }

    else {
        pauseButton.src = "./images/pause.png"; 
        intervalManager(true, update, 1000/acceleration );

    }
  

}



/* for game replay button in game */

function gameReplay1(){

    intervalManager(false, update, 1000/acceleration );
    score = 0;
    score_text.innerHTML= `score is : ${score}`;
    acceleration = 8 ;
    snakeX = blockSize*5; 
    snakeY = blockSize*5;
    snakeBody =[];
    intervalManager(true, update, 1000/acceleration );
    pauseButton.style = null ; /* to remove the display:none property which was set in game over  */
    replayButton1.style = null;
    velocityX = 0 ;
    velocityY = 0 ;

    update();


}

/* for managing interval */

function intervalManager(flag, func, time) {
    if(flag)
        interval =  setInterval(func, time);
    else
        clearInterval(interval);
 }
