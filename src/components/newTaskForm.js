import React from 'react';
import { Button } from 'semantic-ui-react';
import TaskForm from './taskForm.js'
import moment from 'moment';
import alertify from 'alertifyjs'


const dateFormat = 'DD-MM-YYYY hh:mm'


export default class NewTaskForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: '',
      description: '',
      deadline: '',
    }
  }

  toggleForm = (e=null) => {
    if (e) {
      e.stopPropagation()
    }

    this.setState({
      show: !this.state.show,
      name: '',
      description: '',
      deadline: ''
    })
  }

  _validateDate(deadline) {
    if (Object.prototype.toString.call(deadline) === "[object Date]") {
      if (isNaN(deadline.getTime())) {
        alertify.notify('Заполните срок в правильном формате:\n' +
                        'дд-мм-гггг чч:мм', 'error', 5)
        return false
      }
    } else {
      alertify.notify('Заполните в правильном формате:\n' +
                      'дд-мм-гггг чч:мм', 'error', 5)
      return false
    }

    return true
  }

  _validateName(name) {
    if (name.length === 0) {
      alertify.notify('Заполните название', 'warning', 10)
      return false
    }

    return true
  }


  handleDateChange = (e) => {
    let value = e.target.value;

    if (moment(value, dateFormat).format(dateFormat) !== 'Invalid date') {
      this.setState({
        deadline: value
      })
    } else if (value.split('_').length === 1) {
      alertify.notify("Неправильная дата", "error", 10)
      this.setState({
        deadline: value
      })
    } else {
      this.setState({
        deadline: value
      })
    }
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;

    this.setState({
      [name]: val
    });
  }

  submit = (info) => {
    let deadline = moment(this.state.deadline, dateFormat).format();
    deadline = new Date(deadline);

    if (!this._validateDate(deadline)) {
      return
    }

    if (!this._validateName(this.state.name)) {
      return
    }

    this.props.addNewTask({
      name: this.state.name,
      description: this.state.description,
      deadline: deadline
    })
    this.toggleForm()
  }

  render() {
    if (this.state.show) {
      return(
        <div className='task-cell'>
          <TaskForm
            submit={this.submit}
            handleInputChange={this.handleInputChange}
            handleDateChange={this.handleDateChange}
            name={this.state.name}
            deadline={this.state.deadline}
            description={this.state.description}
            cancel={this.toggleForm}>
          </TaskForm>
        </div>
      )
    } else {
      return(
        <Button color='green' onClick={this.toggleForm}>Добавить</Button>
        )
    }
  }
}
