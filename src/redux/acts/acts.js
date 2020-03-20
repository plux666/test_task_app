export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const CHANGE_TASK = 'CHANGE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const MOVE_TASK = 'MOVE_TASK';


export function addNewTask(taskInfo) {
  return {
    type: ADD_TASK,
    info: taskInfo
  }
}

export function toggleComplete(taskId) {
  return {
    type: TOGGLE_TASK,
    taskId
  }
}

export function deleteTask(taskId) {
  return {
    type: DELETE_TASK,
    taskId
  }
}

export function changeTask(taskInfo) {
  return {
    type: CHANGE_TASK,
    info: taskInfo
  }
}

// task is taskId of moved task, target is showindex of replaced tasks
export function moveTask(task, target) {
  return {
    type: MOVE_TASK,
    task: task,
    target: target
  }
}
