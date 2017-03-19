import * as types from 'constants/chat'


const initialState = {
  isFetching: false,
  list: []
}

export default (state=initialState, action) => {
  switch(action.type) {
    case types.LOAD_MESSAGES_START:
    case types.SEND_MESSAGE_START:
      return {
        ...state,
        isFetching: true
      }

    case types.LOAD_MESSAGES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: [...action.data].reverse()
      }

    case types.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: [action.data, ...state.list]
      }

    default:
      return state
  }
}