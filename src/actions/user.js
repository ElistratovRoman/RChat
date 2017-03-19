import * as types from 'constants/user'
import moment from 'moment'


export const loadUsers = () => (dispatch) => {
  dispatch({ type: types.LOAD_USERS_START })

  setTimeout(() => {
    dispatch({ type: types.LOAD_USERS_SUCCESS, data: getUsers() })
  }, 1000)
}

export const addDeposit = (deposit) => (dispatch) => {
  dispatch({ type: types.ADD_DEPOSIT_START })

  let users = getUsers()
  let { deposits, accounts } = users.client
  let account = accounts.filter((acc) => acc.id == deposit.accountId)[0]

  account.balance = account.balance - deposit.summ

  account.operations.push({
    card: account.card,
    type: "write_off",
    type_translate: "Списание на карту",
    value: deposit.summ,
    created_at: moment().format('DD.MM.YYY | hh:mm')
  })

  deposits.push({
    ...deposit,
    id: deposits.length + 1,
    created_at: new Date()
  })

  setUsers(users)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dispatch({ type: types.ADD_DEPOSIT_SUCCESS, data: getUsers() }))
    }, 1000)
  })
}

const getUsers = () => JSON.parse(window.localStorage.getItem('chatUsers'))

const setUsers = (users) => window.localStorage.setItem('chatUsers', JSON.stringify(users))