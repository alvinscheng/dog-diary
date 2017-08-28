import { combineReducers } from 'redux'

function reducer(state = { name: 'Dog', age: 0, id: 0 }, action) {
  switch (action.type) {
    case 'PICKED_DOG':
      return action.payload.dog
    default:
      return state
  }
}

export default reducer
