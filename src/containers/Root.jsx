import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import App from 'containers/App'


export default class Root extends React.Component {

  static propTypes = {
    store: React.PropTypes.object.isRequired
  }

  render() {
    const { store, history } = this.props

    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App} />
        </Router>
      </Provider>
    )
  }
}
