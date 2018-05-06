
let defaultState = {
	searchResults: [],
	friendInfo: {}
};

function applyFriends(state, action){
	let _userLists = state.searchResults.concat([]);
	_userLists.forEach((item) => {
		if(item.account == action.result.account) {
			item.myApplyLists = action.result.myApplyLists;
		}
	});
	return Object.assign({}, state, {searchResults: _userLists})
}

function applyFriendInfo(state, action) {
	let friendInfo = action.info;
  return Object.assign({}, state, {friendInfo: friendInfo})
}

export default function pageState(state = defaultState, action) {
	switch(action.type) {
		case 'SEARCH_USERS': {
			return Object.assign({},state, {searchResults: action.userLists})
		}
		case 'APPLY_FRIEND': {
			return applyFriends(state, action)
		}
    case 'SET_FRIEND_INFO': {
      return applyFriendInfo(state,action)
    }
		default: {
			return state
		}
	}
}