import React, { Component } from 'react';
import { db } from '../firebase'

class Chat extends Component{
    componentDidMount(){
        db.ref('/chat-rooms').on('value', snapshot =>{
            console.log("db snapshot: ", snapshot.val());
        });
    }
    render(){
        return (
            <div>
                <h3>Chat</h3>
            </div>
        )
    }
}
export default Chat