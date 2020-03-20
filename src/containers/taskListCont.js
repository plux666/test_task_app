import { connect } from 'react-redux'
import TaskList from './../components/taskList.js'
import { addNewTask, deleteTask, moveTask } from './../redux/acts/acts.js'


const mapStateToProps = state => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewTask: info => {
      dispatch(addNewTask(info))
    },
    deleteTask: taskId => {
      dispatch(deleteTask(taskId))
    },
    moveTask: (taskId, target) => {
      dispatch(moveTask(taskId, target))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
