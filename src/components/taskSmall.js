import React, { useState } from 'react';
import { Card, Icon, Image, Button, Checkbox } from 'semantic-ui-react';
import TaskForm from './taskForm.js';
import moment from 'moment'
import alertify from 'alertifyjs'


const dateFormat = 'DD-MM-YYYY hh:mm'


export default class SmallTask extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      fullView: false,
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.info.name,
      deadline: moment(this.props.info.deadline, dateFormat).format(dateFormat),
      description: this.props.info.description
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.info != prevProps.info) {
      this.setState({
        name: this.props.info.name,
        deadline: moment(this.props.info.deadline, dateFormat).format(dateFormat),
        description: this.props.info.description
      })
    }
  }

  toggleEdit = (e) => {
    e.stopPropagation()

    this.setState({edit: !this.state.edit})
  }

  handleDateChange = (e) => {
    let value = e.target.value;

    if (moment(value, dateFormat).format(dateFormat) !== 'Invalid date') {
      this.setState({
        deadline: value
      })
    } else if (value.split('_').length === 1) {
      alertify.notify("Неправильная дата", "error", 10)
    } else {
      this.setState({
        deadline: value
      })
    }
  }

  handleInputChange = (e) => {
    e.stopPropagation()

    const name = e.target.name;
    const val = e.target.value;

    this.setState({
      [name]: val
    });
  }

  submit = (info) => {

    let deadline = moment(this.state.deadline, dateFormat).format();
    deadline = new Date(deadline);

    this.props.changeTask({
      name: this.state.name,
      description: this.state.description,
      deadline: deadline,
      id: this.props.info.id,
      complete: this.props.info.complete
    })
    this.toggleEdit()
    this.setState({fullView: false})
  }

  toggleComplete = (e) => {
    e.stopPropagation()

    this.props.changeTask({
      name: this.props.info.name,
      description: this.props.info.description,
      deadline: this.props.info.deadline,
      id: this.props.info.id,
      complete: !this.props.info.complete
    })
  }

  delete = (e) => {
    e.stopPropagation()
    this.setState({fullView: false}, this.props.delete(this.props.info.id))
  }

  render() {
    if (!this.state.edit) {
      let color = 'green'

      if ((Date.now() - this.props.info.deadline) > 259200000) {
        color = 'yellow';
      }
      let descPreview = '';
      if (this.props.info.description.length > 40 & !this.state.fullView) {
        descPreview = this.props.info.description.slice(0, 40) + '...'
      } else {
        descPreview = this.props.info.description;
      }

      let date = moment(this.props.info.deadline, dateFormat).format('DD-MM-YYYY hh:mm');

      return(
        <div id={this.props.info.id} className={this.state.fullView ? 'task-full-view' : 'task-cell'}
          draggable='true'
          onDragEnd={(e) => {e.persist();console.log(e)}}
          onClick={()=>{this.setState({fullView: !this.state.fullView})}}>
          <div className='s-ovl'>
            <div className={this.props.info.complete ? 'complete-overlay' : ''}></div>
            <Card color={color}>
              <Card.Content>
                <Card.Header>{this.props.info.name}</Card.Header>
                <Card.Meta>
                  <span className='date'>
                    {date}
                  </span>
                </Card.Meta>
                <Card.Description>
                  <div style={{cursor: 'pointer'}}
                    onClick={()=>{this.setState({fullView: !this.state.fullView})}}>
                    {descPreview}
                  </div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <label style={{marginBottom: '2px', marginRight: '5px'}}>
                  {this.props.info.complete ? "Выполнено" : 'Завершить'}
                </label>
                <Checkbox toggle
                  defaultChecked={this.props.info.complete}
                  onChange={this.toggleComplete}
                  >
                </Checkbox>
              </Card.Content>
              <Card.Content extra>
                <Button.Group>
                  <Button
                    basic
                    color='blue'
                    onClick={this.toggleEdit}>
                    Редактировать
                  </Button>
                  <Button
                    basic
                    color='red'
                    onClick={this.delete}>
                    Удалить
                  </Button>
                </Button.Group>
              </Card.Content>
            </Card>
          </div>
        </div>
        )
    } else {
      return(
          <TaskForm
            submit={this.submit}
            handleInputChange={this.handleInputChange}
            handleDateChange={this.handleDateChange}
            name={this.state.name}
            deadline={this.state.deadline}
            description={this.state.description}
            cancel={this.toggleEdit}></TaskForm>
      )
    }
  }
}
