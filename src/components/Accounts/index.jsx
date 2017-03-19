import React from 'react'
import Account from './Account'


export default class Accounts extends React.Component {

  render() {
    let { user, match } = this.props

    if (!user) return null

    return (
      <div className='accounts'>
        {
          !!match && match.params.id
            ? this.renderAccount()
            : this.renderAccounts()
        }
      </div>
    )
  }

  renderAccount = () => {
    let { id } = this.props.match.params
    let accountData = this.props.user.accounts.filter((acc) => acc.id == id)

    return <Account key={id} data={accountData[0]} isOpen={true} handleShare={this.props.handleShare} />
  }

  renderAccounts = () => this.props.user.accounts.map((acc) => <Account key={acc.id} data={acc} />)
}
