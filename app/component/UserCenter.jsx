import React, { Component } from 'react';
import PageHeader from './PageHeader.jsx';
import '../scss/usercenter.scss';
import classNames from 'classnames'
import axios from "axios";
import {addFriend} from "../actions";

const updateItems = [{
  label: '昵称',
  name: 'nickname',
  maxLen: '18',
	value: ''
},{
  label: '个性签名',
  name: 'info',
  maxLen: '100',
  value: ''
}, {
  label: '性别',
  name: 'sex',
  maxLen: '2',
  value: ''
}];

export default class UserCenter extends Component {
	constructor(props){
		super(props);
		this.setPageState = this.setPageState.bind(this);
		this.modifyUserInfo = this.modifyUserInfo.bind(this);
		this.getFocusStyle = this.getFocusStyle.bind(this);
		this.saveUserInfo = this.saveUserInfo.bind(this);
		this.uploadHandle = this.uploadHandle.bind(this);
		this.addFriend = this.addFriend.bind(this);
		this.state = {
      updateItems: updateItems,
			avatar: TBZ.UPLOAD_DEFAULT_AVATAR,
			isFocued: false
		}
	}
	setPageState(){
		return this.props.setPageState('USERINFO-HIDE-PAGE')
	}
  modifyUserInfo(e,index){
		const value = e.target.value || '';
		const _updateItems_ = this.state.updateItems;
    _updateItems_[index].value = value;
		this.setState({
      isFocued: true,
      updateItems: _updateItems_
		});
	}
  saveUserInfo(e, item){
    const value = e.target.value || '';
    const _updateItems_ = this.state.updateItems;
    let info = {account: TBZ.USER_ACCOUNT};
		if(!value || this.props.userInfo[item.name] === value) return;
    _updateItems_.map(item => {
    	info[item.name] = item.value
    });
		this.props.updateUserInfo(info);
	}
	getFocusStyle(item){
    return classNames({
      'userinfo-focus': !item.value
    })
	}
  uploadAvatar(e){
		const file = e.target.files[0];
		const fileReader = new FileReader();
    let imgURL = '', self = this;
		if(!/^image\//.test(file.type)) {
      alert('图片格式不对');
    	//TODO 图片格式不对
			return;
		}
		if(file.size >= 40000) {
			alert('图片太大');
      //TODO 图片太大
			return;
		}
    fileReader.readAsDataURL(file);
    fileReader.onload = function(ev) {
    	imgURL = ev.target.result;
      self.setState({
        avatar: imgURL
      });
      self.uploadHandle(file);
		};
	}
  uploadHandle(file){
    let form_data = new FormData();
    form_data.append('account', TBZ.USER_ACCOUNT);
    form_data.append('img', file);
    axios.post(TBZ.DEFAULT_URL + 'upload?account=' + TBZ.USER_ACCOUNT, form_data).then(res => {
    	if(res && res.data && res.data.imgUrl) {
        this.props.updateUserInfo({
					account: TBZ.USER_ACCOUNT,
					avatar: TBZ.DEFAULT_URL + res.data.imgUrl
				});
			}
		}).catch(err => {
			console.log('上传图片出错',err)
		});
	}
  addFriend(){
		const {applyFriend, friendInfo} = this.props;
    applyFriend({
      friendAccount: friendInfo.account + '',
      selfAccount: TBZ.USER_ACCOUNT
		});
		console.log(this.props.friendInfo.account)
	}
	render(){
		let {friendInfo, currentPage, userInfo} = this.props;
		if(currentPage !== 'USERINFO-PAGE') return null;
		const isFriendInfo = !TBZ.isEmptyObject(friendInfo);
		if(isFriendInfo) {
      userInfo = friendInfo;
		}
    console.log(friendInfo,currentPage)
		const { avatar, isFocued } = this.state;
		const updateElements = this.state.updateItems.map((item, index) => {
			if(!item.value && !isFocued) {
				item.value = userInfo[item.name];
			}
			return (
        <li key={item.label} className={this.getFocusStyle(item)}>
          <label htmlFor="nickname">{item.label}</label>
          <div className="userinfo-item">
            <input type="text" id="nickname"
									 maxLength={item.maxLen}
									 value={item.value || ''}
                   disabled={isFriendInfo}
									 onBlur={(e) => this.saveUserInfo(e, item)}
						       onChange={(e) => this.modifyUserInfo(e,index)}/>
						{
              !isFriendInfo ? (
                <div>
                  <span>{item.maxLen}</span>
                  <i className="w-icon-edit"></i>
                </div>
							) : null
						}
          </div>
        </li>
			)
		});
		return (
				<div className="UserCenter-container">
						<PageHeader setPageState={this.setPageState} />
						<div className="UserCenter-profile">
							<div className="UserCenter-avatar" style={{ backgroundImage: 'url('+ (userInfo.avatar || avatar)  +')' }}>
               	 <input type="file" onChange={(e) => this.uploadAvatar(e)}
                        disabled={isFriendInfo}
												className="UserCenter-upload"/>
							</div>
						</div>
						<div className="UserCenter-update">
              <ul>
								{updateElements}
              </ul>
						</div>
					{
            isFriendInfo ? (
              <div className="UserCenter-btn-box">
									<div className="UserCenter-add" onClick={this.addFriend}>
                    <i className="w-icon-plus"></i>
									</div>
									<div className="UserCenter-chat">
										<i className="w-icon-message-o"></i>
									</div>
              </div>
						) : null
					}
				</div>
		)
	}
}