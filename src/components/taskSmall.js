import React, { useState } from 'react';
import { Card, Icon, Image, Button, Checkbox } from 'semantic-ui-react';
import TaskForm from './taskForm.js';


export default class SmallTask extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      fullView: false,
      name: this.props.info.name,
      deadline: this.props.info.deadline,
      description: this.props.info.description
    };

    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  toggleEdit() {
    this.setState({edit: !this.state.edit})
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
    let deadline = this.props.info.deadline;
    if (this.state.deadline != this.props.info.deadline) {
      let date = this.state.deadline.split(' ')[0];
      let time = this.state.deadline.split(' ')[1];
      let [day, mon, yr] = [...date.split('-')];
      mon = mon - 1;
      let [min, sec] = [...time.split(':')];

      deadline = new Date(yr, mon, day, min);
    }

    this.props.changeTask({
      name: this.state.name,
      description: this.state.description,
      deadline: deadline,
      id: this.props.info.id,
      complete: this.props.info.complete
    })
    this.toggleEdit()
  }

  toggleComplete(e) {
    this.props.changeTask({
      name: this.props.info.name,
      description: this.props.info.description,
      deadline: this.props.info.deadline,
      id: this.props.info.id,
      complete: !this.props.info.complete
    })
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
        console.log(descPreview)
      } else {
        descPreview = this.props.info.description;
      }
      return(
        <div id={this.props.info.id} className={this.state.fullView ? 'task-full-view' : 'task-cell'}
          draggable='true'
          onDragEnd={(e) => {e.persist();console.log(e)}}>
          <div className='s-ovl'>
            <div className={this.props.info.complete ? 'complete-overlay' : ''}></div>
            <Card color={color}>
              <Card.Content>
                <Card.Header>{this.props.info.name}</Card.Header>
                <Card.Meta>
                  <span className='date'>
                    {`${this.props.info.deadline.getFullYear()}-${this.props.info.deadline.getMonth()}-${this.props.info.deadline.getDate()}`}
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
                  value={this.props.info.complete}
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
                    onClick={() => {this.props.delete(this.props.info.id)}}>
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
