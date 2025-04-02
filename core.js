
const WIDTH = 30;
const HEIGHT = 20;

const COLORS = ["#6d001a", "#be0039", "#ff4500", "#ffa800", "#ffd635","#fff8b8",
                "#00a368", "#00cc78", "#7eed56", "#00756f", "#009eaa", "#00ccc0",
                "#2450a4", "#3690ea", "#51e9f4", "#493ac1", "#6a5cff", "#94b3ff",
                "#811e9f", "#b44ac0", "#e4abff", "#de107f", "#ff3881", "#ff99aa",
                "#6d482f", "#9c6926", "#ffb470", "#000000", "#515252", "#898d90",
                "#d4d7d9", "#ffffff"];

var PIXELS = [];
for(let y = 0; y < HEIGHT; y++) {
    PIXELS.push([]);
    for(let x = 0; x < WIDTH; x++) {
        PIXELS[y].push(-1);
    }
}

var HISTORY = [];

/**
 * 
 * @param {Array} coord 
 * @param {Int} color 
 */
function setPixel(coord, color) {
    if(coord == undefined || color == undefined || !Array.isArray(coord) || coord.length != 2 || coord[0] < 0 || coord[1] < 0 || color < 0 || coord[0] >= WIDTH || coord[1] >= HEIGHT || color >= COLORS.length)
        return;
    
    addHistoryEntry(coord, color);
    PIXELS[coord[1]][coord[0]] = color;
}

function addHistoryEntry(coord, color) {
    let key = coord[0] + ":" + coord[1];
    let date = new Date().getTime();

    HISTORY[key] = {
        time: date,
        coord: coord,
        color: color
    }
}

function getPeriodicData() {
    let data = Object.values(HISTORY);
    HISTORY = [];
    return data;
}

function getLoginData() {
    return {pixels: PIXELS, colors: COLORS};
}

module.exports = {
    setPixel,
    getLoginData,
    getPeriodicData
}
