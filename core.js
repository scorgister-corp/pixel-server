
const WIDTH = 30;
const HEIGHT = 20;

const COLORS = ["a", "b", "c", "d", "e"]

var PIXELS = [];
for(let y = 0; y < HEIGHT; y++) {
    PIXELS.push([]);
    for(let x = 0; x < WIDTH; x++) {
        PIXELS[y].push(-1);
    }
}

/**
 * 
 * @param {Array} coord 
 * @param {Int} color 
 */
function setPixel(coord, color) {
    if(coord == undefined || color == undefined || !Array.isArray(coord) || coord.length != 2 || coord[0] < 0 || coord[1] < 0 || coord[0] >= WIDTH || coord[1] >= HEIGHT)
        return;

    PIXELS[coord[1]][coord[0]] = color
}
