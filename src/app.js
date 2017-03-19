import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store/configureStore'
import createHistory from 'history/createBrowserHistory'
import usersData from 'data/users'
import Root from './containers/Root'


let storage = window.localStorage

if (!storage.getItem('chatMessages')) {
  storage.setItem('chatMessages', JSON.stringify([]))
  storage.setItem('emulateCount', 0)
}

if (!storage.getItem('chatUsers')) {
  storage.setItem('chatUsers', JSON.stringify(usersData))
}

const history = createHistory()
const store = configureStore({}, history)
const rootEl = document.getElementById('app')

const renderApp = (RootComponent) => {
  render(
    <AppContainer>
      <RootComponent store={store} history={history} />
    </AppContainer>,

    rootEl
  )
}

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    unmountComponentAtNode(rootEl)
    renderApp(require('./containers/Root').default)
  })
}

renderApp(Root)