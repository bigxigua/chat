import { connect } from 'react-redux'
import Index from './Index.jsx'

import { 
	deleteChatItem, 
	setPageState,
	getUserInfo,
	getRoomLists,
	createRoomAction,
  checkLogin
} from '../../actions/index.js'

function mapStateToProps(state) {
	return {
		currentPage: state.setPageState.pageState,
		lists: state.roomList.roomLists,
		histories: state.message.messageLists,
		userInfo: state.setUserInfo.userInfo,
		isLogin: state.setUserInfo.isLogin,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		deleteItem: (index) => {dispatch(deleteChatItem(index))},
		setPageState: (params) => {dispatch(setPageState(params))},
		getUserInfo: (account) => {dispatch(getUserInfo(account))},
		getRoomLists: (token) => {dispatch(getRoomLists(token))},
		createRoomAction: (info) => {
			dispatch(createRoomAction(info))
		},
		checkLogin: (account) => {
			return dispatch(checkLogin(account))
		}
	}
} 

export default connect(mapStateToProps, mapDispatchToProps)(Index)