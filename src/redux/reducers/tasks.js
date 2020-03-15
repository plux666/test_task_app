import { ADD_TASK, DELETE_TASK, CHANGE_TASK } from '../acts/acts.js';
import { v4 as uuidv4 } from 'uuid';


// showIndex: index in which tasks must be shown, set by drag n dropTask
// and saved on server
const initialState = {
  tasks: [
    {
      id: uuidv4(),
      deadline: new Date(2020, 2, 3, 23, 0),
      name: 'Сделать тестовое',
      description: '>_>',
      complete: false,
      showIndex: 0
    },
    {
      id: uuidv4(),
      deadline: new Date(2020, 2, 5, 23, 0),
      name: 'Выполненая задача',
      description: 'не очень',
      complete: true,
      showIndex: 2
    },
    {
      id: uuidv4(),
      deadline: new Date(2020, 2, 7, 23, 0),
      name: 'Длинное описание',
      description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
      complete: true,
      showIndex: 1
    }
  ]
}

export function tasks(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  if (action.type === ADD_TASK) {
    let newState = Object.assign({}, state);

    let newInfo = Object.assign({}, action.info);
    newInfo.id = uuidv4()
    newInfo.showIndex = newState.tasks.length + 1;
    newInfo.complete = false

    newState.tasks.push(newInfo)
    newState.tasks = Array.from(newState.tasks)

    return newState
  } else if (action.type === DELETE_TASK) {
    let newState = Object.assign({}, state);

    let ind = newState.tasks.findIndex(v => {
      if (v.id === action.taskId) {
        return v
      }
    })

    let tasks = Array.from(newState.tasks)
    tasks.splice(ind, 1)
    newState.tasks = tasks

    return newState
  } else if (action.type === CHANGE_TASK) {
    let newState = Object.assign({}, state);

    let ind = newState.tasks.findIndex(v => {
      if (v.id === action.info.id) {
        return v
      }
    })

    let tasks = Array.from(newState.tasks);
    tasks[ind] = action.info;
    newState.tasks = tasks;

    return newState
  }

  return state
}
