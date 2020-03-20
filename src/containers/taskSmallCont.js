import { connect } from 'react-redux'
import TaskSmall from './../components/taskSmall.js'
import { deleteTask, changeTask } from './../redux/acts/acts.js'


const mapStateToProps = (state, ownProps) => {
  let task = state.tasks.filter(v => {
    if (v.id === ownProps.id) {
      return v
    }
  })[0]
  return {
    info: task,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteTask: taskId => {
      dispatch(deleteTask(taskId))
    },
    changeTask: taskInfo => {
      dispatch(changeTask(taskInfo))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskSmall)
