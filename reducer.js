import { combineReducers } from 'redux'

function reducer(state = {}, action) {
  switch (action.type) {
    case 'PICKED_DOG':
      return action.payload.dog
    default:
      return state
  }
}

export default reducer
