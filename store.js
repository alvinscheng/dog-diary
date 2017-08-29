import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer, { name: 'Dog', age: 0, id: 0 })

export default store
