import * as types from 'constants/chat'


export const loadMessages = () => (dispatch) => {
  dispatch({ type: types.LOAD_MESSAGES_START })

  setTimeout(() => {
    dispatch({ type: types.LOAD_MESSAGES_SUCCESS, data: getMessages() })
  }, 1000)
}

export const sendMessage = (msg, emulator=false) => (dispatch, getState) => {
  dispatch({ type: types.SEND_MESSAGE_START })

  let { users } = getState()
  let user = emulator ? users.client : users.support
  let messages = getMessages()
  let message = createMessage(msg, user)

  setMessages([...messages, message])

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dispatch({ type: types.SEND_MESSAGE_SUCCESS, data: message }))
    }, 1000)
  })
}

const getMessages = () => JSON.parse(window.localStorage.getItem('chatMessages'))

const setMessages = (messages) => window.localStorage.setItem('chatMessages', JSON.stringify(messages))

const createMessage = (msg, user) => ({
  ...msg,
  actor: user,
  created_at: new Date()
})