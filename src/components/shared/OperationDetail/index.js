import React from 'react'
import cn from 'classnames'
import './style.sass'


export default class OperationDetail extends React.Component {
  render() {
    let { data, short } = this.props
    let operand = data.type == 'refill' ? '+' : '-'

    if (short) {
      return (
        <div className='operation-detail'>
          <p className='operation-detail__date'>
            { `${data.created_at} ` }
            (<span className={data.type}>
              { `${operand} ${data.value}` }
            </span>)
          </p>
        </div>
      )
    }

    return (
      <div className='operation-detail'>
        <p className='operation-detail__date'>{ data.created_at }</p>

        <p>
          { `${data.type_translate} ${data.card }` }
          &nbsp;
          &nbsp;
          <span className={data.type}>
            { `${operand} ${data.value}` }
          </span>
        </p>
      </div>
    )
  }
}
