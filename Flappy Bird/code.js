/* video : https://www.youtube.com/watch?v=baBq5GAL0_U&list=PLnKe36F30Y4bLhA-st9sC4ZthyV7nsL2Q&index=18 */


//board
let board ; 
let boardWidth = 300;
let boardHeight= 180;
let context ; 

//bird
let birdWidth = boardWidth/12;
let birdHeight = boardHeight/15;

let birdX = boardWidth/10; 
let birdY =  boardHeight/2;
let birdImg = new Image();



//pipes 
let pipeArrT =[]; //top array
let pipeArrB = []; //bottom array 


let pipeWidth = boardWidth/7;
let pipeHeight = boardHeight/1.5;
let pipeX =  boardWidth;
let pipeY = 0;

let topPipeImg ;
let bottomPipeImg ;


let opening = boardHeight/3.5; 


//physics 
let velocityX = -1; //pipes moving towards left speed

let velocityY = 0 //for bird jump
let gravity = 0.07; //positive number so bird will go down



//trophy

let score =0 ;

//control
let reqAnim;
let startJump = false;
let pauseTxt;
let Paused = false;
let isgameover = false;

window.onload = function(){
    startTheGame();
}



function startTheGame(){



     /* load all the flappy bird image at first to ensure that no loading time occur while playing */ /* https://stackoverflow.com/questions/9892540/images-not-loading-properly */

  var image =`images/flappybird.png`; 
  let loaded = 2;  
  loadImages();

    function loadImages(){
        let tmp = new Image;
        tmp.onload = function(){finish();};
        tmp.src = image;
    }

    function finish(){
        console.log("finish loading");
    }



    gameBoard =  document.getElementById('gameBoard');
    gameBoard.style.background = "url('images/startBanner.png')";
    gameBoard.style.backgroundRepeat = "no-repeat";
    gameBoard.style.backgroundSize = 'cover';

    startLogo = document.createElement('img');
    startLogo.id='startGame';
    document.addEventListener("keydown",clickStart);
    gameBoard.appendChild(startLogo);


    startTxt = document.createElement('h3');
    startTxt.id = 'startTxt';
    startTxt.innerHTML="press any button to START";

    gameBoard.appendChild(startTxt);



}
function clickStart(){

    document.removeEventListener("keydown",clickStart);
    setGame();
    gameBoard.removeChild(startLogo);
    gameBoard.removeChild(startTxt);

}



function setGame(){


    gameBoard.style = null;
    startJump = false;

    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");
    
    birdImg.src=`images/flappybird.png`

    birdImg.onload = function(){
        context.drawImage(birdImg,birdX,birdY, birdWidth, birdHeight);

    }


    //pipes and a function to place the pipes
    topPipeImg = new Image();
    topPipeImg.src=`images/toppipe.png`;

    bottomPipeImg = new Image();
    bottomPipeImg.src= `images/bottompipe.png`;



    //when pressing key down make the bird jump , but check the key first because it might be the pause Q key 
    document.addEventListener("keydown",moveBird);

    //info about game
    context.fillStyle ="black";
    context.font = '0.8em VT323';
    context.fillText("To start the game, jump by hitting 'arrow up' or 'space' ", 7, board.height/9); 

}


function update(){
    reqAnim = requestAnimationFrame(update); //https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    context.clearRect(0,0,boardWidth,boardHeight);

    //bird

    velocityY += gravity;
    birdY = Math.max(birdY+velocityY,0); //to not make the bird fly above the screen
    context.drawImage(birdImg,birdX,birdY, birdWidth, birdHeight);
    
    if(birdY > boardHeight){
        gameOver();
    }
    for(let i = 0 ; i < pipeArrT.length ; i++){
        //draw top pipes
        let pipe = pipeArrT[i];
        pipe.x = pipe.x + velocityX; //move the pipe towards the left
        context.drawImage(pipe.img, pipe.x ,pipe.y , pipe.width , pipe.height);
        
        //detect collisions with upper pipes
        if(detectCollisionsTop(birdX,birdY,pipe)){
            gameOver();
        }

        //check to see if bird passed the pipe //we will do this code only once
        if(!pipe.passed && birdX >= pipe.x+pipe.width ){
            score += 1 ;
            pipe.passed = true;
        }

        //draw bottom pipes
        pipe = pipeArrB[i];
        pipe.x = pipe.x + velocityX; //move the pipe towards the left
        context.drawImage(pipe.img, pipe.x ,pipe.y , pipe.width , pipe.height); 
        
         //detect collisions with lower pipes
        if(detectCollisionsBottom(birdX,birdY,pipe)){
            gameOver();
        }
    }


    //clear the pipes that have passed the canvas , to update the pipeArrT , because after awhile the pipe will pass the canvas and thus there will be no neeed to draw it again , that is why we will check to see if the pipe has passen the canvas , if so we will shift the array to delete that pipe so only the pipes that haven't yet passed the canvas will be in pipearray 
    if(pipeArrT.length > 0 && pipeArrT[0].x< -pipeArrT[0].width){
        pipeArrT.shift();
        pipeArrB.shift();
    }


    //draw the score :

    context.fillStyle ="white";
    context.font = '1.5em VT323';
    context.fillText(score, board.width/12 , board.height/8); 


    
    //write the pause thing 
    
    context.fillStyle ="white";
    context.font = '1em VT323';
    pauseTxt ="pause: Q"
    context.fillText(pauseTxt, board.width/1.3 , board.height/10); 
    

}


function placePipes(){


    let randomPipeY = pipeY - randomnumYtop();
    


    function randomnumYtop(){
        let num = Math.floor(Math.random()*boardHeight/2);
        return num;
    }

    let topPipe ={
        img : topPipeImg,
        x :  pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false ,   //does the floppy bird passed the pipe or no 

    }

    let bottomPipe = {
        img : bottomPipeImg,
        x :  pipeX,
        y: randomPipeY+pipeHeight+opening,
        width: pipeWidth,
        height: pipeHeight,
        passed: false ,  
    }




    if (document.hasFocus()) {
        pipeArrT.push(topPipe);  //to prevent the placepipe function from being called when window is not active //https://www.w3schools.com/jsref/met_document_hasfocus.asp
        pipeArrB.push(bottomPipe);
    } 



}




function moveBird(e){
    if(e.code=="Space" || e.code =="ArrowUp"){
        //jump 
        if(!startJump){
            pipeInterval = setInterval(placePipes , 1350); //eveery 1.5s
            reqAnim =requestAnimationFrame(update);  //to make the animation and game start after the player click the first jump
            startJump = true;
        }

        velocityY = -2;
    }

    if(e.key =="q" && Paused== false && startJump && !isgameover){
        Paused = true;
        pauseGame();
    }

    if(e.key == "w" && Paused == true && startJump && !isgameover){
        Paused = false;
        resumeGame();
    }

    if(e.key =="x" &&startJump && isgameover){
        replay();
    }

}


function detectCollisionsTop(x,y,p){  //x for bird X , y for bird Y , p for pipe

    return (parseInt(x+(birdWidth/2))>=p.x && parseInt(x+(birdWidth/2))<= (p.x+p.width) && (y>=0 && y<=p.y+p.height ) )? true:false   //x+bird width , to detect the collision when the bird frontface hits the pipe and not the tail of the bird since the image of bird starts at bottom left

}

function detectCollisionsBottom(x,y,p){
    return (parseInt(x+birdWidth/2)>=p.x &&  parseInt(x+(birdWidth/2))<= (p.x+p.width) && (y<=boardHeight && y>=(p.y-birdHeight/2 )))? true:false 
}



/* controls */


function gameOver(){

    cancelAnimationFrame(reqAnim); //https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame  //https://codinhood.com/nano/js/stop-request-animation-frame-javascript/


    setTimeout(function(){


        context.fillStyle="white";
        context.globalAlpha = 0.3; // https://stackoverflow.com/questions/10487882/html5-change-opacity-of-a-draw-rectangle
        context.fillRect(0,0,board.width,board.height);
        context.globalAlpha = 1.0;

        let gameOverimg = new Image();
        gameOverimg.src ='images/gameOver.png';

        gameOverimg.onload=function(){  //this is better than just writing context.drawimg directly because it removes the delay of download when playing the game
                context.drawImage(gameOverimg,boardWidth/6,0,boardWidth/1.5,boardHeight/2);
        }

        context.fillStyle="orange";

        context.fillRect(boardWidth/4, boardWidth/4, boardWidth/2, boardHeight/2);

        context.strokeStyle = "white";
        context.lineWidth = "2.5";
        context.strokeRect(boardWidth/3.34, boardWidth/3.5, boardWidth/2.5 , boardHeight/2.5);


        context.fillStyle ="white";
        context.font = '1em VT323';
        context.fillText("your score is : ", board.width/3, board.height/1.7); 
        context.font = '2em VT323';
        context.fillText( score, board.width/2.15, board.height/1.35); 
        context.font = '0.8em VT323';
        context.fillText( "press X to restart", board.width/3.1, board.height/1.2); 

    
        isgameover =true;

        

    } , 300);
    



}


function pauseGame(){

    clearInterval(pipeInterval); 

    cancelAnimationFrame(reqAnim);

    context.clearRect(board.width/1.3 , 0, 100,30 );  //to remove txt "pause :q" //https://www.w3schools.com/jsref/canvas_clearrect.asp#:~:text=The%20clearRect()%20method%20clears,not%20change%20the%20current%20path.


    context.fillStyle="white";
    context.globalAlpha = 0.3; // https://stackoverflow.com/questions/10487882/html5-change-opacity-of-a-draw-rectangle
    context.fillRect(0,0,board.width,board.height);
    context.globalAlpha = 1.0;

    context.fillStyle ="black";
    context.font = '1em VT323';
    pauseTxt ="resume: W ";


    context.fillText(pauseTxt, board.width/1.3 , board.height/10); 
    
    context.fillStyle ="black";
    context.font = '2em VT323';
    context.fillText( "game Paused", board.width/3.8, board.height/2); 

}

function resumeGame(){
    reqAnim = requestAnimationFrame(update); 
    pipeInterval = setInterval(placePipes , 1350); //eveery 1.5s
}


function replay(){    

    birdY = boardHeight/2  ;
    pipeArrT = [];
    pipeArrB = [];
    score = 0 ;
    isgameover =false;

    clearInterval(pipeInterval); 

    setGame();

}