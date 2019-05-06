import React from 'react';
export default class Cover extends React.Component {


    render(){
        return(
            <div>
                <div className = "logo">
                    NodeSync
                </div>

                <div className = "buttons">
                    <button className = "ui green button" onClick={this.handleClick}>
                        Log In
                    </button>

                    <button className = "ui blue button">
                        Sign Up
                    </button>
                </div>
            </div>
        )
    }
}

