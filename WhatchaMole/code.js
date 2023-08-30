

let currentMoletile ; 
let currentBombtiles = [];
let tiles = [];

let score = 0 ; 
let startGame = false;

let timing = 1200; /* in milisecond */
let interval;

let board ;

let game_pause = false;
let pauseButton;
let replayButton1;


/* for z-index */

z_level1 = 10;
z_level2 = 20;
z_level3 = 30 ;


let gameBoard;
let startBanner ;
let startButton; 



window.onload = function() {
    startTheGame();
}



function startTheGame(){

    /* load all the FRUIT images at first to ensure that no loading time occur while playing */ /* https://stackoverflow.com/questions/9892540/images-not-loading-properly */

    var images =['images/explosion.png','images/tilePot.png','images/startGame.png','images/startButton.png','images/mole.png','images/bomb.png']; //num of images
    let loaded = 1;  
    loadImages();

    function loadImages(){
        for(let i=0;i<images.length;++i){
        let tmp = new Image;
        tmp.onload = function(){loaded++; if(loaded==images.length){finish();}};
        tmp.src = images[i];
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
    setGame();
    gameBoard.removeChild(startBanner);
    gameBoard.removeChild(startButton);
}

function setGame(){


    board = document.getElementById("board");
 
    let k = 0 ;


    for(let i = 0 ; i < 3 ;i++){
        let tileLevel = document.createElement("div");
        for(let j =0 ; j < 3 ; j++){
           let tile = document.createElement("div");
           tile.id = k.toString();
           tiles.push(tile);
           tiles[k].addEventListener( "click" , selectTile);
    
   
           tileLevel.appendChild(tile);
           k++;
        }
        tileLevel.style.zIndex = i;
        board.appendChild(tileLevel);
    }
    

    //setInterval(setMole,1050); /*The setInterval() method calls a function at specified intervals (in milliseconds).   https://www.w3schools.com/jsref/met_win_setinterval.asp */ 
     //interval = setInterval(setBomb,timing);
    intervalManager(true, setBomb, timing );

    pauseButton =  document.getElementById("pause");
    replayButton1=  document.getElementById("replay1");
    
}




/************************ for moles *****************/

let perviousnum =0 ;

function getRandomTile(){

    //math.random returns random number that's greater than or equal to 0 and less than 1
    let num = Math.floor(Math.random()*9); //math.floor to ensure that the returned number is an integer



    /* to avoid number being repeated twice in a row */

   while(num==perviousnum){
    num = Math.floor(Math.random()*9); 
   } 
   perviousnum =num;

    return num.toString();
    
}

function setMole(){


    /* if a tile exists with a mole , clear the mole from this tile */
    if(currentMoletile){

        currentMoletile.innerHTML=""; /* Delete the HTML content of a the currentmoletile element */
        /*currentMoletile.style.zIndex = '-3' ; /* reset to normal */
    }


    let mole = document.createElement("img");
    mole.src="./images/mole.png";
    mole.id='mole';



    let mole_tile_num = getRandomTile();

    currentMoletile = document.getElementById(mole_tile_num);
    currentMoletile.appendChild(mole);

   

    /*currentMoletile.style.zIndex = 'initial'; /*https://stackoverflow.com/questions/1806421/how-to-get-a-parent-element-to-appear-above-child*/ 
    

    /*play animation on div with javascript : https://stackoverflow.com/questions/48152119/how-to-play-animation-on-div-with-javascript */
    mole.style.animation = `moleAppear ${timing/2000}s  infinite alternate` ; 
    
}



/************************** for bombs************** */


let perviousnumBomb=0 ; 

function getRandomTileforBomb(){



    //math.random returns random number that's greater than or equal to 0 and less than 1
    let num = Math.floor(Math.random()*9); //math.floor to ensure that the returned number is an integer



    /* to avoid number being repeated twice in a row */

   while(num==perviousnumBomb){
    num = Math.floor(Math.random()*9); 
   } 
   perviousnumBomb =num;

    return num.toString();
    
}



function setBomb(){

    
    if(currentBombtiles.length >= 3){

        for(let i = 0 ; i< currentBombtiles.length ; i++){
                
            currentBombtiles[i].innerHTML="";
            //currentBombtiles[i].style.zIndex= "-3";
          

        }
        currentBombtiles = [];
 

   } 
 
   setMole(); // i put setMole here instead of in setGame because setting multiple setInterval functions with the same delay result in bug

   
    for (let i = 0 ; i < 3; i++){

        
    let bomb = document.createElement("img");
    bomb.src = "./images/bomb.png";
    bomb.style.width = '23%';
    bomb.style.left= "3%";
    bomb.style.zIndex='-2'; //because if mole and bomb appears on the same tile , let the mole be infront of the bomb
        
    let num = getRandomTileforBomb();
    
        
    currentBombtiles.push(document.getElementById(num));    
    currentBombtiles[i].appendChild(bomb);
    //currentBombtiles[i].style.zIndex = 'initial'; /*https://stackoverflow.com/questions/1806421/how-to-get-a-parent-element-to-appear-above-child*/ 
   
   
    // if(num>=0 && num <3){
    //     bomb.style.zIndex='-3';
    // }
    // else if( num >= 3 && num < 6){
    //     bomb.style.zIndex='-2';
    // }
    // else if( num >= 6 && num < 9){
    //     bomb.style.zIndex='-1';
    // }
   
    /*play animation on div with javascript : https://stackoverflow.com/questions/48152119/how-to-play-animation-on-div-with-javascript */
    bomb.style.animation = `moleAppear ${timing/2000}s  infinite alternate` ; 
    
    }


}


/*********for scores  *********/

let score_text ;
function selectTile(){


    score_text = document.getElementById('score');
    if (currentBombtiles.includes(this)){   /* Check if an Item is in an Array in JavaScript – JS Contains with Array.includes() */
       

        score_text.innerHTML= `Game Over, your Score is: ${score}`;
        score_text.style.paddingLeft = '0.1em';
        score_text.style.alignSelf = 'center';
        score_text.style.fontSize = '3em';


        gameOver();
    }
    else if(this == currentMoletile){
        score += 5 ;
        score_text.innerHTML= `score is : ${score}`;
    }
     


}



/*********   game control  **********/

function gameOver(){

    intervalManager(false, setBomb, timing );

    for(let i = 0 ; i< tiles.length ; i++){
       tiles[i].removeEventListener("click",selectTile);

       tiles[i].innerHTML='';


       //if(tiles[i].hasChildNodes()){    /* https://www.geeksforgeeks.org/how-to-check-if-an-element-has-any-children-in-javascript/ */
        //tiles[i].firstChild.style.animationPlayState = 'paused';
       //}
    
    }

    /**** for the explosion image***/

    let explosion = document.createElement('img');
    explosion.src= './images/explosion.png';
    explosion.id= "explosion";
    board.appendChild(explosion);


   /***for removing buttons on top**/
   
   pauseButton.style.display = 'none' ;
   replayButton1.style.display = 'none' ;

   // sleep(5000);  /*https://www.sitepoint.com/delay-sleep-pause-wait/* */
  /* sleep this way doesn;t work because https://stackoverflow.com/questions/22919829/javascript-sleep-function-executed-early
  there is a sleep function but i removed it , it is in the first link,
  i am gonna use a function instead as in https://stackoverflow.com/questions/22919829/javascript-sleep-function-executed-early */

    setTimeout(function(){

        let replay = document.createElement('img');
        replay.src ='./images/replay.png';
        replay.id="replay";
        replay.onclick = function(){gameReplay();};            /*https://stackoverflow.com/questions/7066191/javascript-onclick-onsubmit-for-dynamically-created-button */
        board.appendChild(replay);

    } , 1000);
  


}



function gameReplay(){
    

    score= 0 ;
    score_text.innerHTML= `score is : ${score}`;
    score_text.style = null;  /* to revert a style of element back to its css original    https://stackoverflow.com/questions/10698942/how-to-return-a-javascript-set-style-property-to-css-default */

    /* remove the explosion and replay button */
    document.getElementById("explosion").remove();  /*https://stackoverflow.com/questions/3387427/remove-element-by-id */
    document.getElementById("replay").remove();


    /* show buttons again */
    pauseButton.style = null ; /* to remove the display:none property which was set in game over  */
    replayButton1.style = null;
    
    /* start the game again */

    intervalManager(true, setBomb, timing );

    for(let i = 0 ; i< tiles.length ; i++){
        tiles[i].addEventListener("click",selectTile);
     }

}



function gamePause(){

    game_pause = !game_pause; 
    if(game_pause){
        pauseButton.src = "./images/resume.png"; 

        intervalManager(false,setBomb, timing );

        for(let i = 0 ; i< tiles.length ; i++){
            tiles[i].removeEventListener("click",selectTile);
            
            if(tiles[i].hasChildNodes()){    /* https://www.geeksforgeeks.org/how-to-check-if-an-element-has-any-children-in-javascript/ */
                tiles[i].firstChild.style.animationPlayState = 'paused';
                if(tiles[i].childElementCount >1){
                    tiles[i].children[1].style.animationPlayState = 'paused';
                }
            }
        }

        let pauseBanner= document.createElement('div');
        pauseBanner.id='pauseBanner';

        pauseBanner.style.width='100%';
        pauseBanner.style.height='100%';
        pauseBanner.style.background = 'none';
        pauseBanner.style.backgroundColor='rgba(255,255,255, 0.6)';
        pauseBanner.style.position='absolute';
        pauseBanner.style.zIndex='10';
        board.appendChild(pauseBanner);

        let pauseText= document.createElement('h2');
        pauseText.innerHTML='Game Paused';
        pauseText.style.fontSize='2.5em';
        pauseText.style.textAlign='center';
        pauseText.style.position='absolute';
        pauseText.style.width='50%';
        pauseText.style.height='auto';
        pauseText.style.left = '0';
        pauseText.style.right = '0';
        pauseText.style.margin = 'auto';
        pauseText.style.top = '40%';
        pauseText.style.zIndex='10';
        board.appendChild(pauseText);
       


        
      
    }

    else {
        pauseButton.src = "./images/pause.png"; 
        intervalManager(true,setBomb, timing );
        for(let i = 0 ; i< tiles.length ; i++){
            tiles[i].addEventListener("click",selectTile);
                
            if(tiles[i].hasChildNodes()){    /* https://www.geeksforgeeks.org/how-to-check-if-an-element-has-any-children-in-javascript/ */
                tiles[i].firstChild.style.animationPlayState = 'running';
                if(tiles[i].childElementCount >1){
                    tiles[i].children[1].style.animationPlayState = 'running';
                }
            }
        }

        board.removeChild(board.lastElementChild);
        board.removeChild(board.lastElementChild);

    }
  

}

function gameReplay1(){
    score = 0;
    score_text.innerHTML= `score is : ${score}`;


}


/* for managing interval */

function intervalManager(flag, func, time) {
    if(flag)
      interval =  setInterval(func, time);
    else
      clearInterval(interval);
 }