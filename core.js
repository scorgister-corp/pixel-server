const fs = require("fs");

const WIDTH = 256;
const HEIGHT = 256;

const PIXELS_SAVE_FILE = "./pixels.json";
const HISTORY_SAVE_FILE = "./history.json";

const COLORS = ["#6d001a", "#be0039", "#ff4500", "#ffa800", "#ffd635","#fff8b8",
                "#00a368", "#00cc78", "#7eed56", "#00756f", "#009eaa", "#00ccc0",
                "#2450a4", "#3690ea", "#51e9f4", "#493ac1", "#6a5cff", "#94b3ff",
                "#811e9f", "#b44ac0", "#e4abff", "#de107f", "#ff3881", "#ff99aa",
                "#6d482f", "#9c6926", "#ffb470", "#000000", "#515252", "#898d90",
                "#d4d7d9", "#ffffff"];

var PIXELS = [];
var HISTORY = [];

if(!fs.existsSync(PIXELS_SAVE_FILE)) {
    var pixs = [];
    for(let y = 0; y < HEIGHT; y++) {
        pixs.push([]);
        for(let x = 0; x < WIDTH; x++) {
            pixs[y].push(-1);
        }
    }
    PIXELS = pixs;
    fs.writeFileSync(PIXELS_SAVE_FILE, JSON.stringify(pixs));
}else
    PIXELS = JSON.parse(fs.readFileSync(PIXELS_SAVE_FILE));

if(!fs.existsSync(HISTORY_SAVE_FILE)) {
    fs.writeFileSync(HISTORY_SAVE_FILE, JSON.stringify([]));
}

/**
 * 
 * @param {Array} coord 
 * @param {Int} color 
 */
function setPixel(coord, color) {
    if(coord == undefined || color == undefined || !Array.isArray(coord) || typeof color != "number" || coord.length != 2 || coord[0] < 0 || coord[1] < 0 || color < 0 || coord[0] >= WIDTH || coord[1] >= HEIGHT || color >= COLORS.length)
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
    writeBackup(data);

    return data;
}

function getLoginData() {
    return {pixels: PIXELS, colors: COLORS};
}

function writeBackup(historyData) {
    fs.readFile(HISTORY_SAVE_FILE, (err, data) => {
        let oldData = JSON.parse(data);
        for(let entry of historyData) {
            oldData.push(entry);
        }

        fs.writeFileSync(HISTORY_SAVE_FILE, JSON.stringify(oldData));
    });

    fs.writeFile(PIXELS_SAVE_FILE, JSON.stringify(PIXELS), ()=>{})
}

module.exports = {
    setPixel,
    getLoginData,
    getPeriodicData
}
