import React, { Component } from 'react';
import PageHeader from './PageHeader.jsx';
import '../scss/usercenter.scss';
import classNames from 'classnames'

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
},{
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
		this.state = {
      updateItems: updateItems
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
      updateItems: _updateItems_
		});
	}
  saveUserInfo(e, item){
    // const value = e.target.value || '';
    // const _updateItems_ = this.state.updateItems;
    // let info = {account: TBZ.USER_ACCOUNT};
		// if(!value || this.props.userInfo[item.name] === value) return;
    // // _updateItems_.map(item => {
    // // 	info[item.name] = item.value
    // // });
		// this.props.updateUserInfo(info);
	}
	getFocusStyle(item){
    return classNames({
      'userinfo-focus': !item.value
    })
	}
	render(){
		const userInfo = this.props.userInfo;
		const updateElements = this.state.updateItems.map((item, index) => {
			return (
        <li key={item.label} className={this.getFocusStyle(item)}>
          <label htmlFor="nickname">{item.label}</label>
          <div className="userinfo-item">
            <input type="text" id="nickname"
									 maxLength={item.maxLen}
									 value={item.value || userInfo[item.name] || ''}
									 onBlur={(e) => this.saveUserInfo(e, item)}
						       onChange={(e) => this.modifyUserInfo(e,index)}/>
            <div>
              <span>{item.maxLen}</span>
              <i className="w-icon-edit"></i>
            </div>
          </div>
        </li>
			)
		});
		return (
				<div className="UserCenter-container">
						<PageHeader setPageState={this.setPageState} />
						<div className="UserCenter-profile">
							<div className="UserCenter-avatar" style={{ backgroundImage: 'url('+ TBZ.UPLOAD_DEFAULT_AVATAR +')' }}></div>
						</div>
						<div className="UserCenter-update">
              <ul>
								{updateElements}
              </ul>
						</div>
				</div>
		)
	}
}