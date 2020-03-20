import React from 'react';
import SmallTask from '../containers/taskSmallCont.js';
import NewTaskForm from './newTaskForm.js'


class TaskList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showForm: false
    }
  }

  _mapTasks = () => {
    // creating array sorted on showIndex
    let tasks = this.props.tasks.sort((a, b) => {
      if (a.showIndex < b.showIndex) {
        return -1
      } else {
        return 0
      }
    });


    return tasks.map((v, i, a) => {
      return(
        <div id={i}
          key={'f' + v.id}
          onDrop={(e) => {this.dropTask(e, i)}}
          onDragOver={this.dropTask}
          showind={v.showIndex}
          className='drop-cont'>
          <SmallTask key={v.id} id={v.id} delete={this.delete}></SmallTask>
        </div>
      )
    })
  }

  dropTask = (e, i) => {
    e.preventDefault();
    if (e.type === 'drop') {
      e.persist();
      console.log(e.dataTransfer.getData("text/plain"))
      console.log(i)
      this.props.moveTask(e.dataTransfer.getData("text/plain"), i)
    }
  }

  add = (info) => {
    this.props.addNewTask(
      info
    )
  }

  delete = (taskId) => {
    this.props.deleteTask(taskId)
  }

  render() {
    return(
      <div className='task-list'>
        таски:
        {this._mapTasks()}
        <NewTaskForm addNewTask={this.add}></NewTaskForm>
      </div>
    )
  }
}

export default TaskList
