import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoomData, getChatLog, sendNewMessage } from '../actions';
import { db } from '../firebase';

class ChatRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: ''
        };
    }
    componentDidMount(){
        const { roomId, logId }= this.props.match.params
        this.props.getRoomData(roomId, logId);
    }
    componentWillReceiveProps(nextProps){
        if(!this.props.roomInfo.chatLogId && nextProps.roomInfo.chatLogId){
            console.log('we should have chatlog id');

            db.ref(`/chat-log/${nextProps.roomInfo.chatLogId}`).on('value', snapshot=>{
                this.props.getChatLog(snapshot.val())
            });
        }
    }
    sendMessage(e){
        e.preventDefault();
        console.log("Sending MEssage")

        this.props.sendNewMessage(this.props.roomInfo.chatLogId, this.state.message);
        this.setState({message: ''})
    }
    render(){
        console.log('chat info: ', this.props)
        const { name } = this.props.roomInfo;
        const { chatLog } = this.props;

        const msgs = Object.keys(chatLog).reverse().map((key)=>{
            return <li key={key} className='collection-item'>{chatLog[key]}</li>
        })


        
        return (
            <div>
                <h3>{name ? name : 'Loading...'}</h3>

                <form onSubmit={this.sendMessage.bind(this)}>
                    <label htmlFor="">Enter Message: </label>
                    <input type="text" value={this.state.message} onChange={e=> this.setState({message: e.target.value})}/>
                    <button onClick={this.sendMessage.bind(this)} className="btn">Send Message</button>
                </form>
                
                <ul className= 'collection'>
                    {msgs}
                </ul>
            </div>
        )
    }
}

function mstp(state){
    return{
        roomInfo: state.chat.currentRoom,
        chatLog : state.chat.chatLog
    }
}

export default connect(mstp, { getRoomData, getChatLog, sendNewMessage })(ChatRoom);