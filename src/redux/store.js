import { createStore } from 'redux'
import { tasks } from './reducers/tasks.js'

const store = createStore(tasks)
