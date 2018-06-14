import React, { Component } from 'react';
import '../scss/messagelist.scss'
import classNames from 'classnames'

const pattenEmoji = /#\([\u4e00-\u9fa5]{1,4}\)/gm;
const pattenEmojiExist = /[\u4e00-\u9fa5]{1,4}/gm;

const Emoji = (props) => {
	const index = props.data;
	if(index == undefined) {
		return null
	} else {
			return <div 
					style={{ background: 'url('+ TBZ.expressionsIMG +') 0px ' + (-index)*30 + 'px no-repeat' }}></div>
	}
};

const MessageIcon = (props) => {
	let imgArr = [];
	let result = props.content.replace(pattenEmoji, (item) => {
		let index = TBZ.expressions.indexOf(item.match(pattenEmojiExist)[0]);
		if(index !== -1) {
			imgArr.push(index);
			return 'fuck'
		} else {
			return item
		}
	});
	let resultArr = result.split('fuck'), len = resultArr.length;
	console.log(resultArr)
	const spanClass = classNames({
			'nomal-span': len !== 1
	});
	return resultArr.map((item, index) => {
		return (
			<div key={index} className="content-msg">
				<span className={spanClass}>{item}</span>
				{ (index == len-1 && !item) ? '' : <Emoji data={imgArr[index]}/>}
			</div>)
	});
	
};

export default class MessageList extends Component {
	constructor(props){
		super(props); 
	}
  setPageState(){
    return this.props.setPageState('USERINFO-PAGE')
  }
  setFriendInfo(info){
    return this.props.setFriendInfo(info)
	}
  checkFriendInfo(friendInfo){
		//打开用户信息页面
		this.setPageState();
		this.setFriendInfo(friendInfo);
	}
	render(){
		const info = this.props.data;
		const messageClassNames = classNames({
			'MessageList-container clearfix': true,
			'MessageList-container-other': info.owner.account+'' !== localStorage.getItem('account')
		});

		return ( 
			<div className={messageClassNames}>
				<div className="MessageList-userinfo">
					<img src={info.owner.avatar || TBZ.DEFAULT_AVATAR } className="MessageList-avatar"
							 onClick={() => this.checkFriendInfo(info.owner)} />
				</div>
				<div className="MessageList-content">
					<p>{ info.owner.nickname }</p>
					<div className="MessageList-message">
							<MessageIcon content={info.content} />
					</div>
				</div>
			</div>
		)
	}
}