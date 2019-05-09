import socketIO from "socket.io-client";

export default class SocketHandler {
  // constructor() {}

  static connect = token => {
    console.log("WS connecting...");
    this.io = socketIO(`${process.env.REACT_APP_SOCKET_URL}`, {
      transportOptions: {
        polling: {
          //send extra headers to socket-io
          extraHeaders: {
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            Authorization: `Bearer ${token}`
          }
        }
      }
    });
  };

  static registerSocketListener = (emitType, callback) => {
    console.log("listener registered");

    this.io.on(emitType, callback);
  };

  static emit = (emitType, payload) => {
      this.io.emit(emitType, payload)
  };
}
