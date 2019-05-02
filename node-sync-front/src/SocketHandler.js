import React from 'react'
import socketIO from 'socket.io-client'

export default class SocketHandler extends React.Component {


    componentDidMount = () => {
        this.io = socketIO('http://localhost:8080/')
    }

    testEmit = () => {
        io.emit('connection', () => console.log("hello world"))
    }


}