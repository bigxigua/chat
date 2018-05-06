import {
  connect
} from 'react-redux';

import MessageList from '../component/MessageList.jsx';

import {
  setPageState,
  addFriend,
  setFriendInfo
} from '../actions/index.js'

function mapStateToProps(state) {
  return {
    currentPage: state.setPageState.pageState,
    userInfo: state.setUserInfo.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPageState: (params) => {
      dispatch(setPageState(params))
    },
    addFriend: (params) => {
      dispatch(addFriend(params))
    },
    setFriendInfo: (info) => {
      dispatch(setFriendInfo(info))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)