import React, { Component } from 'react'
import '../scss/chatitem.scss'
import Hammer from 'hammerjs'
 
const DEFAULT_GROUP_AVATAR = TBZ.DEFAULT_GROUP_AVATAR;
const EXPAND_CLASS = 'ChatListItem-Item-expand'

export default class ChatItem extends Component {
	constructor(props){
		super(props);

		this.setPageStateToChatRoom = this.setPageStateToChatRoom.bind(this);
		this.formatTime = this.formatTime.bind(this);
		this.signAsUnread = this.signAsUnread.bind(this);
		this.deleteElement = this.deleteElement.bind(this);
		this.listenTransitionEnd = this.listenTransitionEnd.bind(this);
	}
	setPageStateToChatRoom(){
		const roomName = this.props.data.roomName;
		this.props.setPageState('CHATROOM-PAGE');
		this.props.setUserCurRoom(roomName);
	}
	formatTime(time){
		if(!time) {
			time = new Date(this.props.data.createTime);
		}
		const hour = new Date(time).getHours();
		const chatTime = hour <= 6 ? '凌晨' 
		       : hour <= 9 ? '清晨' : hour <= 12 ? '上午' : hour <= 18 ? '下午' 
		       : hour <= '24' ? '晚上' : '外太空' ;
		return `${chatTime}   ${hour}:${new Date(time).getMinutes()}`
	}

	dragHandle(element){
		const hammer = new Hammer(element);
		hammer.on('panleft', () => {
			this.hasClass(element, EXPAND_CLASS) ? {} : (element.classList.add(EXPAND_CLASS));
		})
		hammer.on('panright', () => {
			this.unExpandHandle(element)
		})
	}

	hasClass(element, className){
		return Array.from(element.classList).indexOf(className) !== -1;
	}

	unExpandHandle(element){
		this.hasClass(element, EXPAND_CLASS) ? (element.classList.remove(EXPAND_CLASS)) : {};
	}

	componentDidMount(){
		this.dragHandle(this.refs.oDragDiv);
	}
	listenTransitionEnd(oElement, index){
		let handleName = 'transitionend';
		const { deleteItem } = this.props;
		window.webkitTransitionEnd ? handleName = 'webkitTransitionEnd' : {};
		oElement.addEventListener(handleName, function handle() {
			deleteItem(index)
		}, false)
	}
	deleteElement(index){
		const ele = this.refs['oContainer' + this.props.data.Index];
		ele.classList.add('slideOutLeft');
		this.listenTransitionEnd(ele, index)
	}

	signAsUnread(){
		this.unExpandHandle(this.refs.oDragDiv);
		const number = this.props.info.unreadNumber > 0 ? '0' : '1';
		this.setState({
			info: Object.assign(this.state.info,{unreadNumber: number})
		})
	}

	render(){
		const info = this.props.data;
		const latestMessage = this.props.latestMessage || {};
		const oContainerName = 'oContainer' + info.Index;
		const unReadMessage = info.unreadNumber > 0 ? (<div className="ChatListItem-msg-number">{info.unreadNumber}</div>) : null;
		return (
			<div className="ChatListItem-container animated" ref={oContainerName}>
				<div className="ChatListItem-Item" ref="oDragDiv" onClick={this.setPageStateToChatRoom}>
						<img src={info.chatAvatar || DEFAULT_GROUP_AVATAR} className="ChatListItem-avatar"/>
						<div className="ChatListItem-msg-box">
								<p>{info.roomName}</p>
								<p>{latestMessage.owner ? (latestMessage.owner.nickname + ' : ' + latestMessage.content) : '暂未有人发言'}</p>
						</div>
						<div className="ChatListItem-time">{this.formatTime(latestMessage.timestamp)}</div>
						{unReadMessage}
				</div>
				<div className="ChatListItem-hidden-element">
						<div className="ChatListItem-hidden-sign" onClick={this.signAsUnread}>
							标为{info.unreadNumber > 0 ? '已' : '未'}读
						</div>
						<div className="ChatListItem-hidden-del" onClick={() => {this.deleteElement(this.props.index)}}>删除</div>
				</div>
			</div>
		)
	}
}