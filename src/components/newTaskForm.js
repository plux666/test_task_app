import React from 'react';
import { Card, Input, TextArea, Button } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';
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

    this.submit = this.submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  toggleForm(e) {
    e.stopPropagation()
    
    this.setState({
      show: !this.state.show,
      name: '',
      description: '',
      deadline: ''
    })
  }

  handleDateChange = (e) => {
    let value = e.target.value;

    if (moment(value, dateFormat).format(dateFormat) !== 'Invalid date') {
      this.setState({
        deadline: value
      })
    } else if (value.split('_').length === 1) {
      console.log('wrong date')
      alertify.notify("Неправильная дата", "error", 10)
    } else {
      this.setState({
        deadline: value
      })
    }
  }

  handleInputChange(e) {
    const name = e.target.name;
    const val = e.target.value;

    this.setState({
      [name]: val
    });
  }

  submit(info) {
    // parse date string to create Date object
    // govnokod c:
    let deadline = moment(this.state.deadline, dateFormat).format();
    deadline = new Date(deadline);

    if (this.state.name.length === 0) {
      alertify.notify('Заполните назание')
      return
    } else if (deadline === 'Invalid date') {
      alertify.notify('Неправильная дата', 'error', 10)
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
            cancel={this.toggleForm}></TaskForm>
        </div>
      )
    } else {
      return(
        <Button color='green' onClick={this.toggleForm}>Добавить</Button>
        )
    }
  }
}
