import React, { Component } from 'react';
import '../scss/inputarea.scss'

import { sendMessage } from '../actions/index.js'

export default class InputArea extends Component {
	constructor(props){
		super(props);
		this.state = {
			content: ''
		}
		this.sendMessage = this.sendMessage.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	sendMessage(){
		const timestamp = new Date().getTime();
		let message = {
			roomName: this.props.currentRoomName,
			type: 'textMessage',
			account: localStorage.getItem('account'),
			content: this.state.content
		}
		return sendMessage(message);
	}
	handleChange(event){
		this.setState({content: event.target.value});
	}
	render(){
		return (<div className="InputArea-container">
							<div className="InputArea-more-feature">
									<i className="w-icon-plus-circle-o"></i>
							</div>
							<div className="InputArea-input-box">
									<input className="InputArea-input" 
												 placeholder="输入消息，使用⌃/⌘ + enter输入表情"
												 value={this.state.content}
												 onChange={this.handleChange} />
									<i className="w-icon-smile-o"></i>
							</div>
							<div className="InputArea-send" onClick={this.sendMessage}>
									<i className="w-icon-enter"></i>
							</div>
						</div>)
	}
}