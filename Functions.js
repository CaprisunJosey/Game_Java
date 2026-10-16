//board
let board; 
const rowcount = 10; ////you only have 10 rows not 11 
const colimncount = 17;
const tilesize = 64;
const boardwidth = colimncount*tilesize;
const boardheight = rowcount*tilesize;

let context;
let TempwallImage;
//tilemap
const tilemap = [
   //Needed to add additional Xs to each row  to match the counts you defined in the const. 
   "XPXXXXXXXXXXXXXXX",
   "X XXXXC    XXXXXX",
   "X XXXXXXXX    CXX",
   "X   XXXXXX XXXXXX",
   "XXX XXXXXX     XX", 
   "X        X XXX XX",
   "X XXX X    XXX XX",
   "X XXX XX X XXX XX",
   "XCXXX   X  E   XX",
   "XXXXXXXXXXXXXXXXX",

];
//X is the wall
//C is the candel 
//p is the player 
//E is the exit 

//this section is being called back to const x & y in function loadmap
class block {
    constructor(image, x, y, width, height,) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;

        this.startX = x; 
        this.startY = y;
    };
};

//the actually objects in game
const walls = new Set();
const candles = new Set();
let character;

//erm window
window.onload = function() {
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");

   loadimages(); //remeber to call on your function 
};

//Images of assets
function loadimages(){
//the order is important. you want the walls to load first, put it first. 
   Tempwall = new Image();
   
   Tempwall.onload= function(){ //tells the JS to wait for the wall image to finish loading before using it to draw the map. 
        loadMap();
        update();
//
      
   };
   

    /*characterupnocandle = new Image();
    characterupnocandle.src = "char_up_nocandle.gif";

    characterdownnocandle = new Image();
    characterdowmnocandle.src = "char_down_nocandle.gif";

    characterleftnocandle = new Image();
    characterleftnocandle.src = "char_left_nocandle.gif";

    characterrightnocandle = new Image();
    characterrightnocandle.src = "char_right_nocandle.gif";*/

        Tempwall.src = "temp wall.png";
};



//recall for things to show up
function loadMap() {
    walls.clear();
    candles.clear();

    for (let r = 0; r < rowcount; r++){
    for (let c = 0; c< colimncount; c++){

      const row = tilemap[r]; 
      const tilemapchar = row[c];  
    
    
      const x = c*tilesize;
      const y = r*tilesize;
      //tilemapchar refers to tilemap not necessarily character specific
      if (tilemapchar == 'X') {
        const wall = new block(Tempwall, x, y, tilesize, tilesize);
        walls.add(wall);
      }

      else if (tilemapchar == 'C') {
        const candle = new block(null, x + 14, y + 14, 4, 4);
        candles.add(candle);
      };
    };
};
};


//originally had two functions with the same name, making the
//New function should clear canvas, draw the walls, and repeats the process every 50miliseconds 

function update(){
   context.clearRect (0,0,board.width, board.height); //clears the pervious drawing before drawing it again and again. without it it will leave a trail of images as the player moves. 

    for (let wall of walls.values()) { //draws wall again
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height)
    }
    setTimeout(update,50); 
   
};


 
