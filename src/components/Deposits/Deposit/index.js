import React from 'react'
import moment from 'moment'
import './style.sass'


export default class Deposit extends React.Component {

  render() {
    let { data, isOpen } = this.props

    return (
      <div className='deposit'>
        <p>{ `Вклад: "${data.name}"` }</p>
        <p>{ `Сумма: ${data.summ} ₽` }</p>
        <p>{ `Открыт: ${moment(data.created_at).format('DD.MM.YYYY')}` }</p>
      </div>
    )
  }
}
