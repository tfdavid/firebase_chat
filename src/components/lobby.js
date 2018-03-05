import React, { Component } from 'react';
import { db } from '../firebase'


class Lobby extends Component{
    constructor(props){
        super(props);
        this.state ={
            roomName: ''
        }
    }
    handleCreateRoom(e){
        e.preventDefault();
        console.log("room name: ", this.state.roomName)
        
        const newRoom = {
            name: this.state.roomName,
            chatLog: [`Room: ${this.state.roomName} - Created`]
        };

        db.ref('/chat-rooms').push(newRoom).then( res=>{
            console.log("Add Room Response: ", res)
        })
    }
    render(){
        const { roomName } = this.state;
        return (
            <div>
                <h3>Chat Lobby</h3>
                <form onSubmit={this.handleCreateRoom.bind(this)}>
                    <label>Chat Room Name</label>
                    <input type="text" onChange={e=>this.setState({roomName: e.target.value})} value={roomName}/>
                    <button className='btn'>Create Room</button>
                </form>
            </div>
        )
    }
}
export default Lobby