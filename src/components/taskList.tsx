import React from 'react';
import SmallTask from './smallTask';
import NewTaskForm from './newTaskForm';
import { useSelector, useDispatch } from 'react-redux';


export interface Task {
  id: string,
  deadline: any,
  name: string,
  description: string,
  complete: boolean,
  showIndex: number
}

const TaskList: React.FC = () => {

  const tasks = useSelector((state:any) => state.tasks);
  const dispatch = useDispatch();

  function _mapTasks() {
    // creating array sorted on showIndex
    let sortedTasks = tasks.sort((a:Task, b:Task) => {
      if (a.showIndex < b.showIndex) {
        return -1
      } else {
        return 0
      }
    });


    return sortedTasks.map((v:Task, i:number, a:Array<Task>) => {
      return(
        <div id={String(i)}
          key={'f' + v.id}
          onDrop={(e: any) => {dropTask(e, i)}}
          onDragOver={(e) => {e.preventDefault()}}
          className='drop-cont'>
          <SmallTask key={v.id} id={v.id}></SmallTask>
        </div>
      )
    })
  }

  function dropTask(e: React.DragEvent<HTMLDivElement>, i: any) {
    e.preventDefault();
    if (e.type === 'drop') {
      e.persist();
      dispatch({
        type: 'MOVE_TASK',
        task: e.dataTransfer.getData("text/plain"),
        target: i
      })
    }
  }

  function add(info: any) {
    dispatch({type: 'ADD_TASK', info: info})
  }


  return(
    <div className='task-list'>
      таски:
      {_mapTasks()}
      <NewTaskForm addNewTask={add}></NewTaskForm>
    </div>
  )
}

export default TaskList
