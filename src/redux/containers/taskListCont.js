import { connect } from 'react-redux'
import TaskList from './../../components/taskList.js'
import { addNewTask, deleteTask } from './../acts/acts.js'


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
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
