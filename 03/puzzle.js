
// original image size
var sourceWidth = sourceHeight = 1024,
  // original image is sliced to 4 x 4 array of tiles 
  sourceTileWidth = sourceTileHeight = sourceWidth / 4,
  // size of each tile on puzzle board 
  destWidth = destHeight = 200;

// tiles array - each tile is represented by an object containing tile's original position and the boolean value that tells if current tile's position is empty
var tiles = [
  {
    originalPositionX: 0,
    originalPositionY: 0,    
    isEmpty: true,
  },
  {
    originalPositionX: 1,
    originalPositionY: 0,   
    isEmpty: false,
  },  
  {
    originalPositionX: 2,
    originalPositionY: 0,    
    isEmpty: false,
  },
  {
    originalPositionX: 3,
    originalPositionY: 0,   
    isEmpty: false,
  },{
    originalPositionX: 0,
    originalPositionY: 1,   
    isEmpty: false,
  },
  {
    originalPositionX: 1,
    originalPositionY: 1,   
    isEmpty: false,
  },  
  {
    originalPositionX: 2,
    originalPositionY: 1,   
    isEmpty: false,
  },
  {
    originalPositionX: 3,
    originalPositionY: 1,   
    isEmpty: false,
  },
{
    originalPositionX: 0,
    originalPositionY: 2,    
    isEmpty: false,
  },
  {
    originalPositionX: 1,
    originalPositionY: 2,    
    isEmpty: false,
  },  
  {
    originalPositionX: 2,
    originalPositionY: 2,    
    isEmpty: false,
  },
  {
    originalPositionX: 3,
    originalPositionY: 2,   
    isEmpty: false,
  },
{
    originalPositionX: 0,
    originalPositionY: 3,    
    isEmpty: false,
  },
  {
    originalPositionX: 1,
    originalPositionY: 3,   
    isEmpty: false,
  },  
  {
    originalPositionX: 2,
    originalPositionY: 3,   
    isEmpty: false,
  },
  {
    originalPositionX: 3,
    originalPositionY: 3,    
    isEmpty: false,
  },
];

// get canvas element
var elem = document.getElementById('canvas');
// get context of canvas element
var ctx = document.getElementById('canvas').getContext('2d');

// Add event listener for changing background picture
function selectBackground() {
  var selectedImg = document.getElementById('backgroundSelector').value;
  document.getElementById('source').src = 'img/' + selectedImg;
  draw();
}

/**
 * Add event listener to canvas
 * 
 */
function setEventListener() {
  // Add event listener for `click` events.
  elem.addEventListener('click', clickHandler);
}

/**
 * Get empty tile position and check neighboring tiles have been clicked
 * 
 */
function clickHandler() {
  var emptyIndex = getEmptyIndex();
  var offsetTop = Math.floor(emptyIndex / 4) * destHeight;
  var offsetLeft = (emptyIndex % 4) * destWidth;

  checkNeighbors(emptyIndex, offsetTop, offsetLeft, elem.offsetLeft, elem.offsetTop, event.pageX, event.pageY);
}

/**
 * Get index of the empty tile
 * 
 * @return {integer}     Index of the empty tile in the array
 */
function getEmptyIndex() {
  var emptyTileIndex = 0;
  for (var i = 0; i < tiles.length; i++) { 
	  if (tiles[i].isEmpty) {
	   return i;
  	}
  }
}

/**
 * Check if any of the neighbors of empty tile is clicked. If yes, switch neighbor and empty tile.
 * 
 * @param  {integer} emptyIndex  Index of the empty tile
 * @param  {integer} offsetTop   Distance (in pixels) of the empty tile from canvas top
 * @param  {integer} offsetLeft  Distance (in pixels) of the empty tile from canvas left
 * @param  {integer} canvasOffsetLeft  Distance (in pixels) that the left edge of the canvas is offset to the left within the parent container
 * @param  {integer} canvasOffsetTop  Distance (in pixels) that the top edge of the canvas is offset to the top within the parent container
 * @param  {integer} pageX  Horizontal coordinate (in pixels) at which the mouse was clicked, relative to the left edge of the entire document
 * @param  {integer} PageY  Vertical coordinate (in pixels) at which the mouse was clicked, relative to the top edge of the entire document
 */
function checkNeighbors(emptyIndex, offsetTop, offsetLeft, canvasOffsetLeft, canvasOffsetTop, pageX, pageY) {
  // check left
  if (pageX < (canvasOffsetLeft + offsetLeft) && pageX > (canvasOffsetLeft + offsetLeft - destWidth)) {
	if (pageY > (canvasOffsetTop + offsetTop) && pageY < (canvasOffsetTop + offsetTop + destHeight)) {
      switchTiles(emptyIndex - 1, emptyIndex);
    }   
  // check right
  } else if (pageX > (canvasOffsetLeft + offsetLeft + destWidth) && pageX < (canvasOffsetLeft + offsetLeft + 2 * destWidth)) {
	if (pageY > (canvasOffsetTop + offsetTop) && pageY < (canvasOffsetTop + offsetTop + destHeight)) {
      switchTiles(emptyIndex, emptyIndex + 1);
    }    
  // check up	
  } else if (pageY < (canvasOffsetTop + offsetTop) && pageY > (canvasOffsetTop + offsetTop - destHeight)) {
	if (pageX > (canvasOffsetLeft + offsetLeft) && pageX < (canvasOffsetLeft + offsetLeft + destWidth)) {
      switchTiles(emptyIndex - 4, emptyIndex);
    }    
  // check down
  } else if (pageY > (canvasOffsetTop + offsetTop + destHeight) && pageY < (canvasOffsetTop + offsetTop + 2 * destHeight)) {
	if (pageX > (canvasOffsetLeft + offsetLeft) && pageX < (canvasOffsetLeft + offsetLeft + destWidth)) {
      switchTiles(emptyIndex, emptyIndex + 4);
    }    
  }
}
  
/**
 * Switch two tiles
 * 
 * @param  {integer} index Index of the first tile that will be switched with the second
 * @param  {integer} nextIndex Index of the second tile that will be switched with the first
 */
function switchTiles(index, nextIndex) {
  // switch two tiles
  var tempTile = tiles[index];
  tiles[index] = tiles[nextIndex];
  tiles[nextIndex] = tempTile;
  // render tiles
  draw();
  // check if tiles are in correct order
  checkSolution();
}
  
/**
 * Check if the tiles are in correct order and the puzzle is solved
 * 
 */
function checkSolution() {
  var isSolved = true;
  // check position of all tiles
  for (var i = 0; i < tiles.length; i++) { 
    // calculate current row
    var row =  Math.floor(i / 4);
     // calculate current column
	  var column = i % 4;
    // compare row and column against original position
    if (tiles[i].originalPositionX !== column || tiles[i].originalPositionY !== row) {
	    isSolved = false;
	  }
  }
  // notify the user if puzzle is solved and make canvas not clickable
  if (isSolved) {
    elem.removeEventListener('click', clickHandler);
    alert("You have successfully solved the puzzle!");
  }
}

/**
 * Randomly shuffle an array
 * @return {String}      The first item in the shuffled array
 */
function shuffle() {
 
  var currentIndex = tiles.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
  	// Pick a remaining element...
  	randomIndex = Math.floor(Math.random() * currentIndex);
  	currentIndex -= 1;

  	// And swap it with the current element.
  	temporaryValue = tiles[currentIndex];
  	tiles[currentIndex] = tiles[randomIndex];
  	tiles[randomIndex] = temporaryValue;
  }	  
  // render tiles
 	draw();
  // add event listener to canvas
  setEventListener();
}

/**
 * Render tiles on canvas
 * 
 */
function draw() {
  // pass through all array elements
  for (var i = 0; i < tiles.length; i++) { 
    // if the element on canvas is empty, render blank rectangle
    if (tiles[i].isEmpty) {
	    ctx.clearRect((i % 4) * destHeight, Math.floor(i / 4) * destWidth, destWidth, destHeight);
    // render tile from the original size and position to the canvas tile size and current position
	  } else {
	    ctx.drawImage(document.getElementById('source'), tiles[i].originalPositionX * sourceTileWidth, tiles[i].originalPositionY * sourceTileHeight, sourceTileWidth, sourceTileHeight, (i % 4) * destHeight, Math.floor(i / 4) * destWidth, destWidth, destHeight)
  	}
  }   
}

