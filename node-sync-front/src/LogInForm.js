import React from 'react';
import socketIO from 'socket.io-client'



export default class Form extends React.Component{
    
    fetchData = (e)=> {
        fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: e.target[0].value, //replace this by event target value
                    password: e.target[1].value //replace this by event target value
                })
            })
            .then(res => res.json())
            .then(user => {
                const io = socketIO('http://localhost:8080/', {
                    transportOptions: {
                        pooling: {
                            //send extra headers to socket-io
                            extraHeaders: {
                                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                                'Authorization': `Bearer ${user.token}`

                            }
                        }
                    }
                })
            })
    }

    render(){
        return(
            <div className = "forms">
                <div className = "log-in-form">
                    <form className ="ui form">

                    
                    </form>
                </div>

                <div className = "sign-up-form">
                    <form className = "ui form">
                        
                    
                    </form>
                </div>
            </div>
        )
    }
}