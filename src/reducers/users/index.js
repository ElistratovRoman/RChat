import * as types from 'constants/user'
import * as usersData from 'data/users'


const initialState = {
  isFetching: false,
  client: null,
  support: null
}

export default (state=initialState, action) => {
  switch(action.type) {
    case types.ADD_DEPOSIT_START:
    case types.LOAD_USERS_START:
      return {
        ...state,
        isFetching: true
      }

    case types.ADD_DEPOSIT_SUCCESS:
    case types.LOAD_USERS_SUCCESS:
      return {
        isFetching: false,
        client: { ...action.data.client },
        support: { ...action.data.support }
      }

    default:
      return state
  }
}

