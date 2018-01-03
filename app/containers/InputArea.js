import { connect } from 'react-redux'
import InputArea from '../component/InputArea.jsx'

function mapStateToProps(state) {
	return {
		nickname: state.setUserInfo.nickname,
		avatar: state.setUserInfo.avatar,
		currentRoomName: state.setUserInfo.currentRoomName,
		roomLists: state.roomList.roomLists
	}
}

function mapDispatchToProps() {
	return {

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(InputArea)