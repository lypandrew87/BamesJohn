"use strict";
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';
// Port where we'll run the websocket server
var webSocketsServerPort = 3001;
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

var clients = [];
var playerInformation = {};
var connections = [];

/**
 * HTTP server
 */
var server = http.createServer(function (request, response) {

});
server.listen(webSocketsServerPort, function () {
  console.log((new Date()) + " Server is listening on port "
    + webSocketsServerPort);
});
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
  httpServer: server
});
// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function (request) {

  var connection = request.accept(null, request.origin);

  playerInformation = {
    playerId: clients.length,
    xPos: 200,
    yPos: 545
  }

  var con = {
    playerId: playerInformation.playerId,
    connection: connection
  }

  connections.push(con);

  //Send current player a playerId and other players
  connection.sendUTF(JSON.stringify({ type: 'CONNECTION_INFORMATION', playerId: playerInformation.playerId, players: clients }));
  
  // we need to know client index to remove them on 'close' event
  clients.push(playerInformation);
  
  //Let all other clients know a new player was added to the game
  for (var i = 0; i < clients.length; i++) {
    if (i !== playerInformation.playerId) {
      connections[i].connection.sendUTF(JSON.stringify({ type: "NEW_PLAYER", player: playerInformation }));
    }

    // user sent some message
    connection.on('message', function (message) {
      try {
        var incomingMessage = JSON.parse(message.utf8Data);
      } catch (e) {
        console.log(e);
      }

      if (incomingMessage.type === "MOVEMENT") {
        clients[incomingMessage.playerId].xPos = incomingMessage.xPos;
        clients[incomingMessage.playerId].yPos = incomingMessage.yPos;

        
        for (var i = 0; i < clients.length; i++) {
          if (clients[i].playerId !== incomingMessage.playerId) {
            connections[i].connection.sendUTF(JSON.stringify({
              type: 'PLAYER_MOVEMENT_UPDATE',
              playerId: incomingMessage.playerId,
              xPos: incomingMessage.xPos,
              yPos: incomingMessage.yPos
            }));
          }
        }
      }
    });
  };
});

/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
