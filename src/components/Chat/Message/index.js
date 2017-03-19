import React from 'react'
import cn from 'classnames'
import moment from 'moment'
import OperationDetail from 'components/shared/OperationDetail'
import './style.sass'


export default class Message extends React.Component {

  render() {
    let { msg, withDate } = this.props
    let isOwner = this.isOwner()

    let cns = cn(
      'msg',
      `msg--${msg.type}`,
      isOwner && 'msg--owner',
      withDate && 'msg--with-date'
    )

    return (
      <div className={cns}>
        { !isOwner && this.renderAvatar() }

        {
          msg.type === 'operation'
            ? this.renderOperationMsg(cns)
            : this.renderTextMsg(cns)
        }

        { isOwner && this.renderAvatar() }

        {
          withDate &&
          <div className='msg__date'>
            { `— ${moment(msg.created_at).format('DD.MM.YYYY')} —` }
          </div>
        }
      </div>
    )
  }

  renderOperationMsg = () => {
    return (
      <div className='msg__text'>
        <p className='msg__text-title'>Операция</p>
        <OperationDetail data={this.props.msg.data} />
      </div>
    )
  }

  renderTextMsg = () => {
    let { msg } = this.props

    return (
      <div className='msg__text'>
        <strong>{`${msg.actor.name}: `}</strong>
        {
          msg.data.split("\n").reduce((acc, line, idx) => {
            acc.push(line)
            acc.push(<br key={idx} />)
            return acc
          }, [])
        }
      </div>
    )
  }

  renderAvatar = () => {
    let userRole = this.isOwner() ? 'support' : 'client'

    return (
      <div className='msg__avatar'>
        <img src={require(`assets/images/${userRole}.jpg`)} />
      </div>
    )
  }

  isOwner = () => this.props.msg.actor.id == 2 // support -> current user
}
