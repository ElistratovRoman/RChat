import React from 'react'
import { Link } from 'react-router-dom'
import Icon from 'components/ui/Icon'
import OperationDetail from 'components/shared/OperationDetail'
import './style.sass'


export default class Account extends React.Component {

  render() {
    let { data, isOpen } = this.props
    let lastOperation = this.getLastOperation(data)
    lastOperation.card = data.card

    return (
      <div className='account'>
        {
          isOpen
            ? <Link to='/accounts' className='account__visible-toggler'>
                <Icon icon='close' size='s' />
              </Link>

            : <Link to={`/accounts/${data.id}`} className='account__visible-toggler'>
                <Icon icon='maximize' size='s' />
              </Link>
        }

        <div className='account__number'>
          { `Счет № ${data.number}` }
        </div>

        <div className='account__balance'>
          { Number(data.balance).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }) }
        </div>

        <div className='account__meta'>
          <p>{ data.rate }</p>
          <p>{ data.created_at }</p>

          {
            !isOpen &&
            <div className='account__meta-operation'>
              <span>{ 'Последняя операция:' }</span>
              { ' ' }
              <OperationDetail data={lastOperation} short={true} />
            </div>
          }
        </div>

        {
          isOpen &&
          <div className='operations'>
            <div className='operations__title'>История операций</div>

            <div>
              {
                data.operations.map((o, i) =>
                  <div key={i} className='operation'>
                    <OperationDetail data={{...o, card: data.card}} />

                    <Icon
                      icon='mingle-share'
                      size='s'
                      className='share'
                      onClick={() => this.props.handleShare({...o, card: data.card})} />
                  </div>
                )
              }
            </div>
          </div>
        }
      </div>
    )
  }

  getLastOperation = ({ operations }) => operations[operations.length - 1]
}
