import React, { Component } from 'react';
import '../scss/chatbox.scss'
import { socket } from '../actions/index.js'
import MessageList from '../containers/messageList.js'

export default class ChatBox extends Component {
	constructor(props){
		super(props);
		this.listenMessage();
		this.genRoomHistories = this.genRoomHistories.bind(this);
	}
	listenMessage(){
		socket.on('newMessage', (message) => {
			this.props.addMessage(message);
			this.autoScroll();
		})
	}
	genRoomHistories(){
		if(this.props.messageLists.length < 1) return [];
		let histories = [];
		this.props.messageLists.map((item) => {
			if(item.name == this.props.currentRoomName) {
				histories = item.histories;
			}
		})
		return TBZ.sortUp(histories, 'timestamp');
	}
	autoScroll(){
		let chatBox = document.querySelector('.ChatBox-container');
		if(!chatBox) return;
    chatBox.scrollTop = chatBox.scrollHeight + 20;
	}
	componentWillReceiveProps(nextProps){
		if(!nextProps.currentRoomName) return;
		setTimeout(()=>{
			this.autoScroll();
		}, 0)
	}
	render(){
		if(!this.props.currentRoomName) return null;
		const ChatBoxStyle = {
			backgroundImage: 'url(' + this.props.chatRoomBackGround + ')'
		}
		const MessageLists = this.genRoomHistories().map((item) => {
			return (<MessageList key={item.timestamp} data={item}> </MessageList>)
		})
		return (
			<div className="ChatBox-container" ref="chatbox" style={ChatBoxStyle}>
				<div className="MessageContainer-content">
					{ MessageLists }
				</div>
			</div>
		)
	}
}