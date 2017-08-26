import { combineReducers } from 'redux'

function reducer(state = [], action) {
  switch (action.type) {
    case 'ADDED_DOGS':
      return action.payload.dogs.concat(state)
    default:
      return state
  }
}

export default reducer
