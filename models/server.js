// Servidor de Express
const express = require('express')

// Servidor de sockets
const http = require('http')

// configuración de sockets	server
const socketIo = require('socket.io')

// cors
const cors = require('cors')


const path = require('path')

const Sockets = require('./sockets')


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000

        // HTTP server
        this.server = http.createServer(this.app)
        // Config sockets
        this.io = socketIo(this.server, {/*opciones*/ })

    }
    middlewares() {
        // Desplegar el directiorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')))
        // Habilitar cors
        this.app.use(cors())

    }

    configSockets() {
        new Sockets(this.io);
    }
    execute() {
        // start Middlewares
        this.middlewares()
        // start config sockets
        this.configSockets()
        // start server
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`)
        })

    }
}

module.exports = Server