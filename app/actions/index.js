import io from 'socket.io-client' 

export const socket = io('http://127.0.0.1:8080', {
	'force new connection': true
});

//显示个人中心页面
export const setPageState = (page) => {
	return {
		type: 'SET_PAGE_STATE',
		page
	}
}

//删除一条聊天记录
export const deleteChatItem = (index) => {
	return {
		type: 'DELETE_ITEM',
		index
	}
}

//往当前房间消息队列里添加消息
export const addMessage = (message) => {
	return {
		type: 'ADD_MESSAGE',
		message //对象 必要roomID/content/type/nickname
	}
}

//发送消息(大群聊)
export const sendMessage = (message) => {
	return new Promise((resolve, reject) => {
		socket.emit('message', message, (body) => {
			body.isError ? (reject(body)) : (resolve(body))
		})
	})
}

//发送消息(私聊)
export const sendPrivateMessage = (message) => {
	return new Promise((resolve, reject) => {
		socket.emit('privateMessage', message, (body) => {
			body.isError ? (reject(body)) : (resolve(body))
		})
	})
}

//填充登陆用户信息
export const setUserCardInfo = (info) => {
	return {
		type: 'SET_USER_CARD_INFO',
		info //登陆的用户信息
	}
}

//获取登陆用户的所有信息
export const _getUserInfo_ = (info) => {
	return {
		type: 'GET_USER_INFO',
		info //登陆的用户信息
	}
}

//获取登陆用户信息
export const getUserInfo = (account) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			if (typeof account == 'object' && account) {
				dispatch(_getUserInfo_(account));
				resolve(account)
			} else {
				socket.emit('getUserInfo', account, (body) => {
					if (!body.isError) {
						dispatch(_getUserInfo_(body));
					}
					body.isError ? (reject(body)) : (resolve(body))
				})
			}
		})
	}
}

//createRoom
export const _createRoom = (info) => {
	return {
		type: 'ADD_ROOM_LISTS',
		info
	}
}

//创建房间
export const createRoomAction = (info) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			socket.emit('createRoom', info, (body) => {
				if (!body.isError) {
					dispatch(_createRoom(body));
				}
				body.isError ? (reject(body)) : (resolve(body))
			})
		})
	}
}

//_getRoomLists
export const _getRoomLists = (lists) => {
	return {
		type: 'GET_ROOM_LISTS',
		lists
	}
}

//获取房间列表
export const getRoomLists = (token) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			socket.emit('getRoomLists', token, (body) => {
				if (!body.isError) {
					dispatch(_getRoomLists(body.userRoomLists))
					dispatch(getAllRoomHistories(body.histories))
				}
				body.isError ? (reject(body)) : (resolve(body))
			})
		})
	}
}

//设置用户当前在哪个房间
export const setUserCurRoom = (roomName) => {
	return {
		type: 'SET_USER_CURROOM',
		roomName
	}
}

//获取所有房间的聊天记录
export const getAllRoomHistories = (histories) => {
	return {
		type: 'GET_HISTORY_MESSAGE',
		histories
	}
}


//搜索用户
export const _searchUsers_ = (userLists) => {
	return {
		type: 'SEARCH_USERS',
		userLists
	}
}
//搜索用户
export const searchUsers = (nickname) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			socket.emit('searchUsers', nickname, (body) => {
				if (!body.isError) {
					dispatch(_searchUsers_(body.userLists))
				}
				body.isError ? (reject(body)) : (resolve(body))
			})
		})
	}
}

//申请加好友
export const _applyFriend_ = (result) => {
	return {
		type: 'APPLY_FRIEND',
		result
	}
}
//申请加好友
export const applyFriend = (accounts) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			socket.emit('applyFriend', accounts, (body) => {
				if (!body.isError) {
					dispatch(_applyFriend_(body.result))
				}
				body.isError ? (reject(body)) : (resolve(body))
			})
		})
	}
}

//添加好友
export const _addFriend_ = (result) => {
	return {
		type: 'ADD_FRIEND',
		result
	}
}
//添加好友
export const addFriend = (accounts) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			socket.emit('addFriend', accounts, (body) => {
				if (!body.isError) {
					dispatch(_addFriend_(body.result))
				}
				body.isError ? (reject(body)) : (resolve(body))
			})
		})
	}
}

//更新当前用户的申请列表
export const updateApplyLists = (myApplyLists) => {
	return {
		type: 'APPLY_FRIEND',
		myApplyLists
	}
}

