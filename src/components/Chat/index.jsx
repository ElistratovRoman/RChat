import React from 'react'
import cn from 'classnames'
import sendFakeMessage from 'utils/sendFakeMessage'
import Message from './Message'
import './style.sass'


export default class Chat extends React.Component {

  state = {
    message: '',
    isScrolled: false
  }

  componentWillMount() {
    let emulateCount = window.localStorage.getItem('emulateCount')

    if (emulateCount == '0') {
      sendFakeMessage(this.props.sendMessage)
    }
  }

  render() {
    let { chat } = this.props
    let { message, isScrolled } = this.state

    let cns = cn(
      'chat',
      isScrolled && 'chat--scrolled'
    )

    return (
      <div className={cns}>
        <div className='chat__separator' />

        <div className='chat__wrapper'>
          <div className='chat__form'>
            <div className='chat__title'>Чат</div>

            <div className='chat__form-wrapper'>
              <textarea
                placeholder='Сообщение'
                value={message}
                onKeyPress={this.handleKeyPress}
                onChange={this.handleInputMessage} />

              <button
                type='button'
                disabled={this.isClearForm()}
                onClick={this.handleSendMessage}>

                Отправить
              </button>
            </div>
          </div>

          <div className='chat__view'>
            <div className='chat__view-wrapper' onScroll={this.handleScroll}>
              {
                chat.list.map((msg, i) => {
                  switch(i) {
                    // first message with date by default
                    case chat.list.length - 1:
                      return <Message key={i} msg={msg} withDate={true} />
                    default:
                      let msgDate = msg.created_at
                      let prevMsgIndex = i + 1
                      let prevMsgDate = chat.list[prevMsgIndex].created_at

                      return <Message key={i} msg={msg} withDate={this.isNewDate(msgDate, prevMsgDate)} />
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleScroll = (e) => {
    console.log(e.target.scrollTop)
    if (!this.state.isScrolled && e.target.scrollTop > 0) {
      this.setState({ isScrolled: true })
    }

    if(this.state.isScrolled && e.target.scrollTop == 0) {
      this.setState({ isScrolled: false })
    }
  }

  isNewDate = (curr, prev) => new Date(curr).setHours(0,0,0,0) > new Date(prev).setHours(0,0,0,0)

  isClearForm = () => !this.state.message

  handleInputMessage = (e) => this.setState({ message: e.target.value })

  handleSendMessage = () => {
    let { sendMessage } = this.props

    sendMessage({ type: 'text', data: this.state.message })
      .then(() => sendFakeMessage(sendMessage))

    this.setState({ message: '' })
  }

  handleKeyPress = (e) => {
    // caret line - shift+enter
    if (e.key === 'Enter' && !e.shiftKey) {
      if (!this.isClearForm()) {
        this.handleSendMessage(this.state.message)
      }

      e.preventDefault()

      return false
    }

    return true
  }
}