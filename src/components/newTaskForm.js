import React from 'react';
import { Card, Input, TextArea, Button } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import TaskForm from './taskForm.js'

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
    this.setState({
      show: !this.state.show,
      name: '',
      description: '',
      deadline: ''
    })
  }

  handleDateChange(e, {name, value}) {
    this.setState({deadline: value})
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
    let deadline;
    if (this.state.deadline) {
      let date = this.state.deadline.split(' ')[0];
      let time = this.state.deadline.split(' ')[1];
      let [day, mon, yr] = [...date.split('-')];
      mon = mon - 1;
      let [min, sec] = [...time.split(':')];

      deadline = new Date(yr, mon, day, min);
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
