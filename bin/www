const WebSocketServer = require('websocket').server
const http = require('http')
const express = require('express')
const path = require('path');
const app = express()
const server = http.createServer(app)
const router = require('../routes/index')
const port = process.env.PORT || 8000

app.use(express.static(__dirname + '/../public' ));
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'pug');
app.use("/", router)

server.listen(port, function() {
    console.log(`servidor na porta ${port}`)
})

const wsServer = new WebSocketServer({httpServer: server})

let clients = []
let connection

wsServer.on('request', function(request) {
    console.log(`Conexão de ${request.origin}`)
    connection = request.accept(null, request.origin)
    clients.push(connection)
    console.log(clients.length)

    connection.on('message', function(message) {
        if (message.type === "utf8") {
            console.log(message.utf8Data)
            clients.forEach(client => client.sendUTF(message.utf8Data))
        }
    })
    connection.on('close', function(connection) {

    })
})
