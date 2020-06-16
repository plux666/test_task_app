export const ADD_TASK:string = 'ADD_TASK';
export const DELETE_TASK:string = 'DELETE_TASK';
export const CHANGE_TASK:string = 'CHANGE_TASK';
export const TOGGLE_TASK:string = 'TOGGLE_TASK';
export const MOVE_TASK:string = 'MOVE_TASK';

export interface Task {
  id: string,
  deadline: any,
  name: string,
  description: string,
  complete: boolean,
  showIndex: number
}

export function addNewTask(taskInfo:Task) {
  return {
    type: ADD_TASK,
    info: taskInfo
  }
}

export function toggleComplete(taskId:string) {
  return {
    type: TOGGLE_TASK,
    taskId
  }
}

export function deleteTask(taskId:string) {
  return {
    type: DELETE_TASK,
    taskId
  }
}

export function changeTask(taskInfo:Task) {
  return {
    type: CHANGE_TASK,
    info: taskInfo
  }
}

// task is taskId of moved task, target is showindex of replaced tasks
export function moveTask(task:string, target:number) {
  return {
    type: MOVE_TASK,
    task: task,
    target: target
  }
}
