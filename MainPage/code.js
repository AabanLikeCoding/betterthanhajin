/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.scrollY;



/*for scrolling down and  for cliking board button in navigation bar*/

var boardINFO = document.querySelector(".boardINFO");
const nav_toggle = document.querySelector(".boardLogo");


window.onscroll = function() {
const Visiability1 = boardINFO.getAttribute("data-visible");    
var currentScrollPos = window.scrollY;
if(Visiability1 == "false"){

    if (prevScrollpos > currentScrollPos) {
    document.getElementsByTagName("header")[0].style.top = "0";
    } else {
     document.getElementsByTagName("header")[0].style.top = "-80px";
    }
    prevScrollpos = currentScrollPos;

  }
else{
  document.getElementsByTagName("header")[0].style.top = "0";
}




}



nav_toggle.addEventListener("click" , () => {
   const Visiability = boardINFO.getAttribute("data-visible");
  if(Visiability == "false"){
    boardINFO.setAttribute("data-visible", true);
    nav_toggle.setAttribute("aria-expanded",true);

    nav_toggle.firstElementChild.firstElementChild.className = "fa-solid fa-x fa-lg";  //to change between icons
    nav_toggle.firstElementChild.style.color="red";

    
  }

  else if(Visiability == "true"){
    boardINFO.setAttribute("data-visible", false);
    nav_toggle.setAttribute("aria-expanded",false);

    nav_toggle.firstElementChild.firstElementChild.className = "fa-solid fa-users-between-lines fa-lg";
    nav_toggle.firstElementChild.style=null;

  }

   
})




let skills = document.getElementById("skills");
let date = document.getElementById("date");
let disc = document.getElementById("gameDes");
let gameTitle =  document.getElementById("gameTitle");
let gameTitleinBox = document.getElementById("gameTitleBox");
let banner = document.getElementById("gameTitleBox");
let playButton = document.getElementById("playButtonlink");
let imgsClicks = document.getElementsByClassName("playButtonlink");

let currentItem = 1; //the middle element
let prevItem=0;
let nextItem = 2;

let currentClass = 1; //the middle element
let prevClass=0;
let nextClass = 2;
let numOfClasses = 3 ;

/* make dictionary */

let ItemsDic = [
  {
    name:'The Snake Game',
    path:'images/snakeGame.png',
    date: '1997',
    skills:'Skills : CAREFUL ',
    disc: 'move the snake so it eats the fruit and grow. If the snake touches itself or the border, IT DIES.',
    web : '../The Snake Game/index.html'

  },

  {
    name:'Whatch A Mole',
    path:'images/whockMole.png',
    date: '1976',
    skills:'Skills : be quick and sharp ',
    disc: "kick the mole head , but don't kick the bomb! you need also to make sure that the bomb is not hiding behind the mole :) !",
    web : '../WhatchaMole/index.html'

  },

  {
    name:'Flappy Bird',
    path:'images/flappyBird.png',
    date: '2013',
    skills:'Skills : CAREFUL ',
    disc: "Fly through the pipes without crashing! make sure not to hit the pipe at ALL",
    web : '../Flappy Bird/index.html'

  },

   /* we add here every new game */
]


let Box_items = document.getElementsByClassName("item");
/* setting the imgs */
Box_items[0].src= ItemsDic[nextItem].path;
Box_items[1].src= ItemsDic[currentItem].path;
Box_items[2].src= ItemsDic[prevItem].path;


/*****Media*****/  /*https://www.w3schools.com/howto/howto_js_media_queries.asp#:~:text=Using%20Media%20Queries%20With%20JavaScript&text=The%20window.,%2Dwidth%2C%20orientation%2C%20etc. */
let media = window.matchMedia("(min-width: 920px)");

if(media.matches){
  console.log("hee");
  playButton.href = ItemsDic[currentItem].web;
  document.getElementsByClassName('item-0')[0].parentNode.src =  ItemsDic[nextItem].web;
  document.getElementsByClassName('item-1')[0].parentNode.src =  ItemsDic[currentItem].web;
  document.getElementsByClassName('item-2')[0].parentNode.src =  ItemsDic[prevItem].web;  
}
else{

  playButton.href =  '../laptops only/index.html';
  document.getElementsByClassName('item-0')[0].parentNode.href =  '../laptops only/index.html';
  document.getElementsByClassName('item-1')[0].parentNode.href =   '../laptops only/index.html';
  document.getElementsByClassName('item-2')[0].parentNode.href =  '../laptops only/index.html';  

}

/**** my slider *******/


function selectNextItem(){


  /*classes*/
  
  if(currentClass>=1){
    currentClass = currentClass - 1 ;
  }
  else{
    currentClass = numOfClasses-1;
  }
  if(currentClass>0){
    prevClass -=1;
  }
  else{
    prevClass= numOfClasses-1-currentClass;
  }
  if(currentClass==numOfClasses-1){
      nextClass = 0 ;
  }
  else{
    nextClass=currentClass+1;
  }
  
    /* items */
    if(currentItem>=1){
      currentItem = currentItem - 1 ;
    }
    else{
      currentItem = ItemsDic.length-1;
    }
    if(currentItem>0){
      prevItem -=1;
    }
    else{
      prevItem= ItemsDic.length-1-currentItem;
    }
    if(currentItem==ItemsDic.length-1){
        nextItem = 0 ;
    }
    else{
      nextItem=currentItem+1;
    }
  
  
  
    
    Box_items[0].className= `item item-${prevClass}`;
    Box_items[1].className= `item item-${currentClass}`;
    Box_items[2].className= `item item-${nextClass}`;
  
    document.getElementsByClassName('item-0')[0].src =  ItemsDic[nextItem].path;
    document.getElementsByClassName('item-1')[0].src =  ItemsDic[currentItem].path;
    document.getElementsByClassName('item-2')[0].src =  ItemsDic[prevItem].path;
  
  
    update();
  
  }



  function selectPrevItem(){



    /* classes */
    if(currentClass<2){  //2 = Box_items.length-1
      currentClass = currentClass + 1 ;
      prevClass +=1;
    }
    else{
      currentClass = 0;
      prevClass = numOfClasses-1-currentClass;
    }
    
    if(currentClass==numOfClasses-1){
        nextClass = 0 ;
    }
    else{
      nextClass=currentClass+1;
    } 
  
    if(currentClass == 1){
      prevClass = 0 ; 
    }
  
    /* imgs and items in box */
  
    if(currentItem< ItemsDic.length-1){  
      currentItem = currentItem + 1 ;
      prevItem +=1;
    }
    else{
      currentItem = 0;
      prevItem = ItemsDic.length-1-currentItem;
    }
    
    if(currentItem==ItemsDic.length-1){
        nextItem = 0 ;
    }
    else{
      nextItem=currentItem+1;
    }
    if(currentItem == 1){
      prevItem = 0 ; 
    }
    
    Box_items[0].className= `item item-${prevClass}`;
    Box_items[1].className= `item item-${currentClass}`;
    Box_items[2].className= `item item-${nextClass}`;
  
    document.getElementsByClassName('item-0')[0].src =  ItemsDic[nextItem].path;
    document.getElementsByClassName('item-1')[0].src =  ItemsDic[currentItem].path;
    document.getElementsByClassName('item-2')[0].src =  ItemsDic[prevItem].path;
  
    update();
  }
  


function update(){


  media = window.matchMedia("(min-width: 920px)");


  gameTitle.innerHTML=ItemsDic[currentItem].name;
  gameTitleinBox.innerHTML=ItemsDic[currentItem].name;

  disc.innerHTML = ItemsDic[currentItem].disc;
  skills.innerHTML = ItemsDic[currentItem].skills;
  date.innerHTML =ItemsDic[currentItem].date;
 


  if(media.matches){
    console.log("hee");
    playButton.href = ItemsDic[currentItem].web;
    document.getElementsByClassName('item-0')[0].parentNode.href =  ItemsDic[nextItem].web;
    document.getElementsByClassName('item-1')[0].parentNode.href =  ItemsDic[currentItem].web;
    document.getElementsByClassName('item-2')[0].parentNode.href =  ItemsDic[prevItem].web;  
  }
  else{

    playButton.href =  '../laptops only/index.html';
    document.getElementsByClassName('item-0')[0].parentNode.href =  '../laptops only/index.html';
    document.getElementsByClassName('item-1')[0].parentNode.href =   '../laptops only/index.html';
    document.getElementsByClassName('item-2')[0].parentNode.href =  '../laptops only/index.html';  
 
  }


  document.documentElement.style.setProperty("--bannerBackground", `url(${ItemsDic[currentItem].path})` );  /*to edit a pseudo element :before , we can edit a variable used in the pseudo element, and we edit a variable declared in root by using this line */ /* https://stackoverflow.com/questions/41370741/how-do-i-edit-a-css-variable-using-js */


}





/******************drop box ************/
/**https://www.youtube.com/watch?v=hBbrGFCszU4**/

const dropdown = document.querySelector('.dropdownMenu');  

const select = dropdown.querySelector('.select');
const selected = dropdown.querySelector('.selected');
const caret = dropdown.querySelector('.caret');

const menu = dropdown.querySelector('.menu');
const options = dropdown.querySelectorAll('.menu li');
const active = dropdown.querySelector('.active');

const leaderboardName  = document.getElementById('leaderboardName');


select.addEventListener("click",()=>{

  caret.classList.toggle('caret-rotate'); /* https://www.javatpoint.com/javascript-classlist#:~:text=Classlist.-,toggle(),or%20removing%20the%20existing%20classes. */
  menu.classList.toggle('menu-open');

 
})


options.forEach( option => {
    option.addEventListener("click",()=>{   /* add eventlistener to each item in options list */

    selected.innerHTML=option.innerHTML;
    leaderboardName.innerHTML = option.innerHTML;


    options.forEach(option =>{
      option.classList.remove('active');
    })
    option.classList.add('active');
    
  
  })
} )