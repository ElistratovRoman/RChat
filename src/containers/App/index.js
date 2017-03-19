import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route, NavLink } from 'react-router-dom'
import * as chatActions from 'actions/chat'
import * as userActions from 'actions/user'
import sendFakeMessage from 'utils/sendFakeMessage'
import Chat from 'components/Chat'
import Accounts from 'components/Accounts'
import Deposits from 'components/Deposits'
import normalize from 'normalize.css'
import './style.sass'


const mapStateToProps = ({ users, chat, location }) => ({ users, chat, location })

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...chatActions,
    ...userActions,
  }, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends React.Component {

  componentWillMount() {
    this.props.actions.loadMessages()
    this.props.actions.loadUsers()
  }

  render() {
    let { users, chat, actions } = this.props

    return (
      <div className='main'>
        <Chat chat={chat} sendMessage={actions.sendMessage} />

        <div className='sidebar'>
          <div className='sidebar__wrapper'>
            <div className='switcher'>
              <div className='switcher-wrapper'>
                <NavLink activeClassName='active' to='/accounts' isActive={this.isAccountsPath}>Счета</NavLink>
                <NavLink activeClassName='active' to='/deposits'>Вклады</NavLink>
              </div>
            </div>

            <Switch>
              <Route path='/accounts/:id' render={({ match }) => <Accounts user={users.client} match={match} handleShare={this.handleShare} />} />

              <Route path='/accounts' render={() => <Accounts user={users.client} />} />

              <Route path='/deposits/:id' render={({ match }) => <Deposits user={users.client} match={match} />} />

              <Route path='/deposits' render={() => <Deposits user={users.client} handleAddDeposit={this.handleAddDeposit} />} />

              <Route path='/' render={() => <Accounts user={users.client} />} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }

  isAccountsPath = (match, location) => location.pathname == '/' || match && match.path == '/accounts'

  handleShare = (operation) => this.props.actions.sendMessage({ type: 'operation', data: {...operation} })

  handleAddDeposit = (deposit) => this.props.actions.addDeposit(deposit)
}
