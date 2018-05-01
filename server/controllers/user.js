const User = require('../models/user-mongo.js');
const Room = require('../models/room-mongo.js');
const bluebird = require('bluebird');
const bcrypt = require('bcrypt');
const config = require('../config/init.js');
const jwt = require('jsonwebtoken') //jsp 基于token的身份验证

const _genJwt = (account) => {
	return jwt.sign({
		user: account,
		exp: Math.floor((new Date().getTime()) / 1000) + 60 * 60 * 24 * 30
	}, config.JWT_KEY)
}

const _genInfo = function(obj) {
	if (!obj || typeof obj !== 'object') return null;
	return {
		nickname: obj.nickname,
		account: obj.account,
		avatar: obj.avatar,
		info: obj.info
	} 
}

var ERROR = {
	isError: true,
	message: '服务器出错了...'
};

module.exports = {
	createUser: async (account, password, nickname) => {
		let salt = await bluebird.promisify(bcrypt.genSalt)(10);
		password = await bluebird.promisify(bcrypt.hash)(password, salt);
		let user = await User.findOneUser({
			account: account
		});
		let room = await Room.findOne({
			name: config.INIT_ROOM
		});
		if (user && room) {
			return {
				isError: true,
				message: '用户已存在'
			}
		}
		let newUser = await User.create({
			account: account,
			password: password,
			nickname: nickname,
			avatar: 'http://www.tbzhong.cn:8080/default_avatar/' + parseInt(Math.random()*10) + '.jpg',
			sex: '未知',
			info: '',
			friends: [],
			notify: [],
			myApplyLists: [],
			onlineState: 1,
			rooms: [room._id]
		});
		console.log(newUser)
		if (newUser) {
			room.users.push(newUser._id);
			await room.save();
			return {
				token: _genJwt(account)
			}
		}
		return ERROR;
	},
	verifyUser: async (account, password) => {
		let user = await User.findOneUser({
			account: account
		});
		if (!user) {
			return {
				isError: true,
				message: '用户不存在'
			}
		}
		let compareResult = bluebird.promisify(bcrypt.compare)(password, user.password);
		if (compareResult) {
			return {
				token: _genJwt(account)
			}
		}
	},
	getUserInfo: async (account) => {
		let user = await User.findOneUser({
			account: account
		});
		if (user) {
			return user;
		} else {
			return {
				isError: true,
				message: '用户不存在'
			}
		}
	},
	searchUsers: async (name) => {
		let users = await User.find({
			nickname: {
				$regex: name,
				$options: 'i'
			}
		});
		if (users && Array.isArray(users)) {
			return {
				userLists: users
			}
		} else {
			return {
				isError: true,
				message: '查询失败'
			}
		}
	},
	applyFriend: async (info, SocketsMap) => {
		//发起好友申请
		//通知对方
		let friend = await User.findOneUser({
			account: info.friendAccount
		});
		let slef = await User.findOneUser({
			account: info.selfAccount
		});
		const slefInfo = _genInfo(slef);
		const friendInfo = _genInfo(friend);
		if (slefInfo && friendInfo) {
			slef.myApplyLists.push(friendInfo);
			await slef.save();
			friend.notify.push(slefInfo);
			await friend.save();
			if(SocketsMap[info.friendAccount]) {
				SocketsMap[info.friendAccount].emit('applyMessage', friend);
			}
			return {
				result: slef
			}
		} else {
			return {
				isError: true,
				message: '好友申请发送失败'
			}
		}
	},
	addFriend: async (accounts) => {
		let friend = await User.findOneUser({
			account: accounts.friendAccount
		});
		let slef = await User.findOneUser({
			account: accounts.selfAccount
		});
		const slefInfo = _genInfo(slef);
		const friendInfo = _genInfo(friend);
		if(slef) {
			slef.friends.push(friendInfo);
			friend.friends.push(slefInfo);
			await slef.save();
			await friend.save();
			return {
				result: slef
			}
		} else {
			return {
				isError: true,
				message: '添加好友失败'
			}
		}
	},
  checkLogin: async (account) => {
    let user = await User.findOneUser({
      account: account
    });
		return (user ? true : false);
  },
  updateUserInfo: async (info) => {
		console.log(info)
    let user = await User.findOneUser({
      account: info.account
    });
    if(user) {
    	if(info.nickname) {
        user.nickname = info.nickname;
      }
      if(info.info) {
        user.info = info.info;
      }
      if(info.sex) {
        user.sex = info.sex;
      }
      if(info.avatar) {
        user.avatar = info.avatar;
      }
      await user.save();
      return user
		} else {
    	return {
        isError: true,
        message: '请登录'
			}
		}
  }
};