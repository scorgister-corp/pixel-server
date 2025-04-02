const {WebSocketServer} = require("ws");

/**
 * Trigger de connexion client
 * @param {WebSocket} clientSocket 
 */
function connection(clientSocket) {
    
}

/**
 * Démarage du serveure WebSocket
 * @param {int} port 
 */
module.exports = (port) => {
    const server = new WebSocketServer({port: port});
    server.on("connection", connection);
};