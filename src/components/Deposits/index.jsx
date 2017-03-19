import React from 'react'
import Icon from 'components/ui/Icon'
import Deposit from './Deposit'
import './style.sass'


const DEPOSIT_NAMES = ['Реактивный', 'Супер Реактивный']

export default class Deposits extends React.Component {

  state = {
    addMode: false,
    deposit: {
      name: null,
      accountId: null,
      summ: ''
    }
  }

  render() {
    let { user, match } = this.props

    if (!user) return null

    return !!match && match.params.id
      ? this.renderDeposit()
      : this.renderDeposits()
  }

  renderDeposit = () => {
    let { id } = this.props.match.params
    let accountData = this.props.user.deposits.filter((acc) => acc.id == id)

    return (
      <div className='deposits'>
        <Deposit key={id} data={accountData[0]} isOpen={true} />
      </div>
    )
  }

  renderDeposits = () => {
    let { addMode, deposit } = this.state
    let { user } = this.props

    return (
      <div className='deposits'>
        {
          addMode
           ? <form onSubmit={this.handleAddDeposit}>
              <Icon icon='close' size='s' onClick={this.closeForm} />

              <div className='form-title'>Выберете тип вклада</div>
              {
                DEPOSIT_NAMES.map((name, i) => {
                  let inputData = {
                    value: name,
                    label: name,
                    name: 'name'
                  }

                  return this.renderRadioButton(inputData)
                })
              }

              <div className='form-title'>Выберете счет списания</div>
              {
                this.props.user.accounts.map((acc, i) => {
                  let inputData = {
                    value: acc.id,
                    label: `№ ${acc.number}`,
                    name: 'accountId'
                  }

                  return this.renderRadioButton(inputData)
                })
              }

              <div className='form-title'>Укажите сумму вклада</div>
              <input
                type='number'
                value={deposit.summ}
                name='summ'
                disabled={!deposit.accountId}
                onChange={this.checkSumm} />

              <input
                type='submit'
                value='Отправить'
                disabled={!deposit.name || !deposit.accountId || !deposit.summ } />
            </form>

          : <div>
              { user.deposits.map((deposit) => <Deposit key={deposit.id} data={deposit} />) }

              <div className='deposits__add' onClick={this.openForm}>
                Открыть вклад
              </div>
            </div>
        }
      </div>
    )
  }

  renderRadioButton = (inputData) => {
    let { value, name, label } = inputData
    return (
      <div className='input-radio' key={value}>
        <input type='radio' value={value} id={value} name={name} onChange={this.handleChangeForm} />
        <label htmlFor={value}>
          { label }
        </label>
      </div>
    )
  }

  openForm = () => this.setState({ addMode: true })

  closeForm = () => this.setState({
    addMode: false,
    deposit: {
      name: null,
      accountId: null,
      summ: ''
    }
  })

  checkSumm = (e) => {
    let { value } = e.target
    let account = this.props.user.accounts.filter((acc) => acc.id == this.state.deposit.accountId)[0]

    if (+account.balance >= +value) {
      this.handleChangeForm(e)
    }
  }

  handleChangeForm = (e) => {
    let { name, value } = e.target

    let deposit = { ...this.state.deposit }
    deposit[name] = value

    this.setState({ deposit: deposit })
  }

  handleAddDeposit = (e) => {
    e.preventDefault()
    this.props.handleAddDeposit(this.state.deposit)
      .then((response) => this.closeForm())
  }
}
