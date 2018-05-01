import { connect } from 'react-redux'
import UserCenter from '../component//UserCenter.jsx'
import {
  updateUserInfo
} from "../actions"

function mapStateToProps(state) {
	return {
		userInfo: state.setUserInfo.userInfo
	}
}

function mapDispatchToProps(dispatch) {
	return {
    updateUserInfo: (params) => {dispatch(updateUserInfo(params))},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCenter)