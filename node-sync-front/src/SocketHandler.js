import socketIO from 'socket.io-client'

const io = socketIO('http://localhost:8080/')

export default class SocketHandler {


    constructor(){

    }

    static testEmit = () => {
        io.emit('connection', () => console.log("hello world"))
    }


}