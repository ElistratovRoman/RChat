import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers } from 'redux'

import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'


export default function configureStore(initialState={}, history) {
  let devTools = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
                  ? window.devToolsExtension()
                  : f => f

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk, routerMiddleware(history)),
      devTools
    )
  )

  // Enable Webpack hot module replacement for reducers
  // if (module.hot) {
  //   module.hot.accept('../reducers', () => {
  //     console.log('upd reducers')
  //     store.replaceReducer( require('../reducers').default )
  //   })
  // }

  return store
}
