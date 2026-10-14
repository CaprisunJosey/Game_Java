//board
let board; 
const rowcount = 11;
const colimncount = 17;
const tilesize = 64;
const boardwidth = colimncount*tilesize;
const boardheight = rowcount*tilesize;

let context;
let TempwallImage;
//tilemap
const tilemap = [
   
   "XPXXXXXXXXXXXXXX",
   "X XXXXC    XXXXX",
   "X XXXXXXXX    CX",
   "X   XXXXXX XXXXX",
   "XXX XXXXXX     X", 
   "X        X XXX X",
   "X XXX X    XXX X",
   "X XXX XX X XXX X",
   "XCXXX   X  E   X",
   "XXXXXXXXXXXXXXXX",

];


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
};

//Images of assets
function loadimages(){
    /*characterupnocandle = new Image();
    characterupnocandle.src = "char_up_nocandle.gif";

    characterdownnocandle = new Image();
    characterdowmnocandle.src = "char_down_nocandle.gif";

    characterleftnocandle = new Image();
    characterleftnocandle.src = "char_left_nocandle.gif";

    characterrightnocandle = new Image();
    characterrightnocandle.src = "char_right_nocandle.gif";*/

    Tempwall = new Image();
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

//update section
loadimages();
loadMap ();
console.log(walls.size);

function update (){
    draw();
    setTimeout(update,50); 
}

function update(){

    for (let wall of walls.values()) {
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height)
    }

};


 
