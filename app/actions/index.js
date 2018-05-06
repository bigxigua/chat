import io from 'socket.io-client'

export const socket = io(window.TBZ.DEFAULT_URL, {
	'force new connection': true
});

export const SET_PAGE_STATE = 'SET_PAGE_STATE';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const GET_HISTORY_MESSAGE = 'GET_HISTORY_MESSAGE';
export const SET_USER_CARD_INFO = 'SET_USER_CARD_INFO';
export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_USER_CURROOM = 'SET_USER_CURROOM';
export const SEARCH_USERS = 'SEARCH_USERS';
export const APPLY_FRIEND = 'APPLY_FRIEND';
export const ADD_FRIEND = 'ADD_FRIEND';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const ADD_ROOM_LISTS = 'ADD_ROOM_LISTS';
export const GET_ROOM_LISTS = 'GET_ROOM_LISTS';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const SET_FRIEND_INFO = 'SET_FRIEND_INFO';


//显示个人中心页面
export const setPageState = (page) => {
	return {
		type: SET_PAGE_STATE,
		page
	}
};

//删除一条聊天记录
export const deleteChatItem = (index) => {
	return {
		type: DELETE_ITEM,
		index
	}
}

//往当前房间消息队列里添加消息
export const addMessage = (message) => {
	return {
		type: ADD_MESSAGE,
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
};

//填充登陆用户信息
export const setUserCardInfo = (info) => {
	return {
		type: SET_USER_CARD_INFO,
		info //登陆的用户信息
	}
};

//获取登陆用户的所有信息
export const _getUserInfo_ = (info) => {
	return {
		type: GET_USER_INFO,
		info //登陆的用户信息
	}
};

//获取登陆用户信息
export const getUserInfo = (account) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			if (typeof account === 'object' && account) {
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
};


//检测用户登陆信息是否过期等
export const __checkLogin__ = (info) => {
  return {
    type: CHECK_LOGIN,
    info //true or false
  }
};

//检测用户登陆信息是否过期等
export const checkLogin = (account) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
    	if(!account) {
        dispatch(__checkLogin__(false));
        resolve(false)
			} else {
        socket.emit('checkLogin', account, (body) => {
          if (!body.isError) {
            dispatch(__checkLogin__(body));
          }
          body.isError ? (reject(body)) : (resolve(body))
        })
			}
    })
  }
};

//createRoom
export const _createRoom_ = (info) => {
	return {
		type: ADD_ROOM_LISTS,
		info
	}
};

//创建房间
export const createRoomAction = (info) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			socket.emit('createRoom', info, (body) => {
				if (!body.isError) {
					dispatch(_createRoom_(body));
				}
				body.isError ? (reject(body)) : (resolve(body))
			})
		})
	}
};

//_getRoomLists
export const _getRoomLists = (lists) => {
	return {
		type: GET_ROOM_LISTS,
		lists
	}
};

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
};

//设置用户当前在哪个房间
export const setUserCurRoom = (roomName) => {
	return {
		type: SET_USER_CURROOM,
		roomName
	}
};

//获取所有房间的聊天记录
export const getAllRoomHistories = (histories) => {
	return {
		type: GET_HISTORY_MESSAGE,
		histories
	}
};


//搜索用户
export const _searchUsers_ = (userLists) => {
	return {
		type: SEARCH_USERS,
		userLists
	}
};
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
};

//申请加好友
export const _applyFriend_ = (result) => {
	return {
		type: APPLY_FRIEND,
		result
	}
};
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
};

//添加好友
export const _addFriend_ = (result) => {
	return {
		type: ADD_FRIEND,
		result
	}
};
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
};

//更新当前用户的申请列表
export const updateApplyLists = (myApplyLists) => {
	return {
		type: 'APPLY_FRIEND',
		myApplyLists
	}
};

//更新用户信息
export const updateUserInfo = (info) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      socket.emit('updateUserInfo', info, (body) => {
        if (!body.isError) {
          dispatch(_getUserInfo_(body))
        }
        body.isError ? (reject(body)) : (resolve(body))
      })
    })
  }
};

//查看好友信息时的好友信息
export const setFriendInfo = (info) => {
  return {
    type: SET_FRIEND_INFO,
    info
  }
};

