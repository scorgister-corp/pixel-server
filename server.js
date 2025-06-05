const {WebSocketServer} = require("ws");
const core = require("./core");

const PERIODIC_SEND_TIMEOUT = 500;
const TYPES = {LOGIN: 0, PLACE: 1, PING: -1};

const PING_PACKAGE = {ping: 1};

/**
 * Trigger de connexion client
 * @param {WebSocket} clientSocket 
 */
function connection(clientSocket) {
    clientSocket.on("message", (data) => {
        try {
            let jsonData = JSON.parse(data);
            onClientData(jsonData, clientSocket);
        }catch(e) {
            if(e.name != 'SyntaxError') {
                console.error(e);
            }
        }
    });
}

function onClientData(data, socket) {
    if(!Object.values(TYPES).includes(data.type))
        return;
    
    switch(data.type) {
        case TYPES.LOGIN:
            onLogin(socket);
            break;
        case TYPES.PLACE:
            onPlace(data, socket);
            break;
        case TYPES.PING:
            send(PING_PACKAGE, socket);
            break;
    }
}

function onLogin(socket) {
    let loginData = core.getLoginData();
    loginData.type = TYPES.LOGIN;
    send(loginData, socket);
}

function onPlace(data, socket) {
    if(data.coord == undefined || data.color == undefined || !Array.isArray(data.coord)) {
        return;
    }

    core.setPixel(data.coord, data.color);
}

function sendPeriodic(server) {
    let data = core.getPeriodicData();
    if(data == undefined || data.length == 0) {
        return;
    }
    
    broadcast({type: TYPES.PLACE, pixels: data}, server);
}

function broadcast(data, server) {  
    server.clients.forEach(socket => {
        socket.send(JSON.stringify(data));
        
    });  
}

function send(data, socket) {    
    socket.send(JSON.stringify(data));
}

/**
 * Démarage du serveure WebSocket
 * @param {int} port 
 */
module.exports = (port) => {
    const server = new WebSocketServer({port: port});
    server.on("listening", () => {
        console.log("WebSocket open on port: " + port);
        setInterval(sendPeriodic, PERIODIC_SEND_TIMEOUT, server);
    })
    server.on("connection", connection);
};