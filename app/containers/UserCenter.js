import { connect } from 'react-redux'
import UserCenter from '../component//UserCenter.jsx'
import {
  updateUserInfo,
  applyFriend
} from "../actions"

function mapStateToProps(state) {
	return {
		userInfo: state.setUserInfo.userInfo,
    friendInfo: state.friends.friendInfo,
    currentPage: state.setPageState.pageState
	}
}

function mapDispatchToProps(dispatch) {
	return {
    updateUserInfo: (params) => {dispatch(updateUserInfo(params))},
    applyFriend: (account) => {dispatch(applyFriend(account))},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCenter)