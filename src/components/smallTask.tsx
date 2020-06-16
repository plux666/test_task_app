import React from 'react';
import { Card, Button, Checkbox } from 'semantic-ui-react';
import moment from 'moment';
import alertify from 'alertifyjs';
import { useSelector, useDispatch } from 'react-redux';

import TaskForm from './taskForm';


enum Color {Green="green", Yellow="yellow"}
const dateFormat = 'DD-MM-YYYY hh:mm';

export interface Task {
  id: string,
  deadline: any,
  name: string,
  description: string,
  complete: boolean,
  showIndex: number
}

export interface SmallTaskProps {
  key: string;
  id: string;
}

const SmallTask = (props:SmallTaskProps) => {

  const task = useSelector((state:any) => {
    return state.tasks.find((v:any) => {
      return v.id === props.id
    })
  });
  const dispatch = useDispatch();

  const [edit, setEdit] = React.useState(false);
  const [fullView, toggleFullView] = React.useState(false);
  const [name, setName] = React.useState(task.name);
  const [description, setDescription] = React.useState(task.description);
  const [deadline, setDeadline] = React.useState(moment(task.deadline).format(dateFormat));


/*
  componentDidMount() {
    this.setState({
      name: this.props.info.name,
      deadline: moment(this.props.info.deadline, dateFormat).format(dateFormat),
      description: this.props.info.description
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.info !== prevProps.info) {
      this.setState({
        name: this.props.info.name,
        deadline: moment(this.props.info.deadline, dateFormat).format(dateFormat),
        description: this.props.info.description
      })
    }
  }
*/
  function toggleEdit() {

    setEdit(!edit);
  }

  function handleDateChange(e: { target: HTMLInputElement }) {
    let value = e.target.value;
    if ((moment(value, dateFormat).format(dateFormat) === 'Invalid date')) {
      alertify.notify("Неправильная дата", "error", 10)
    }
    setDeadline(value)

  }

  function handleInputChange(e: { target: HTMLInputElement }) {
    const name = e.target.name;
    const val = e.target.value;

    if (name === 'name') {
      setName(val)
    } else if (name === 'description') {
      setDescription(val)
    }
  }

  function _validateDate(deadline: any) {
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
  };

  function _validateName(name: string) {
    if (name.length === 0) {
      alertify.notify('Заполните название', 'warning', 10)
      return false
    }

    return true
  }

  function submit() {

    let deadlineDate: object = new Date(moment(deadline, dateFormat).format())

    if (!_validateDate(deadlineDate)) {
      return
    }

    if (!_validateName(name)) {
      return
    }

    dispatch({
      type: 'CHANGE_TASK',
      info: {
        name: name,
        description: description,
        deadline: deadlineDate,
        id: task.id,
        showIndex: task.showIndex,
        complete: task.complete
      }
    })
    toggleEdit()
    toggleFullView(false)
  }

  function toggleComplete(e:any) {
    if (e) {
      e.stopPropagation()
    }
    dispatch({
      type: 'CHANGE_TASK',
      info: {
        name: name,
        description: description,
        deadline: task.complete,
        id: task.id,
        showIndex: task.showIndex,
        complete: !task.complete
      }
    })
  }

  function deleteTask(e:any) {
    if (e) {
      e.stopPropagation()
    }

    toggleFullView(false)
    dispatch({type: "DELETE_TASK", taskId: task.id})
  }


  if (!edit) {
    let color: Color = Color.Green

    if ((Date.now() - task.deadline) > 259200000) {
      color = Color.Yellow;
    }
    let descPreview = '';
    if (task.description.length > 40 && !fullView) {
      descPreview = task.description.slice(0, 40) + '...'
    } else {
      descPreview = task.description;
    }

    let date = moment(task.deadline, dateFormat).format('DD-MM-YYYY hh:mm');

    return(
      <div id={task.id} className={fullView ? 'task-full-view' : 'task-cell'}
        draggable='true'
        onDragStart={(e)=>{e.dataTransfer.setData("text/plain", task.id)}}
        onClick={()=>{toggleFullView(!fullView)}}>
        <div className='s-ovl'>
          <div className={task.complete ? 'complete-overlay' : ''}></div>
          <Card color={color}>
            <Card.Content>
              <Card.Header>{task.name}</Card.Header>
              <Card.Meta>
                <span className='date'>
                  {date}
                </span>
              </Card.Meta>
              <Card.Description>
                <div style={{cursor: 'pointer'}}
                  onClick={()=>{toggleFullView(!fullView)}}>
                  {descPreview}
                </div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <label style={{marginBottom: '2px', marginRight: '5px'}}>
                {task.complete ? "Выполнено" : 'Завершить'}
              </label>
              <Checkbox toggle
                defaultChecked={task.complete}
                onChange={toggleComplete}
                >
              </Checkbox>
            </Card.Content>
            <Card.Content extra>
              <Button.Group>
                <Button
                  basic
                  color='blue'
                  onClick={(e:any) => {e.preventDefault(); toggleEdit()}}>
                  Редактировать
                </Button>
                <Button
                  basic
                  color='red'
                  onClick={deleteTask}>
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
          submit={submit}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          name={name}
          deadline={deadline}
          description={description}
          cancel={(e:any) => {e.preventDefault(); e.stopPropagation(); toggleEdit()}}></TaskForm>
    )
  }
}

export default SmallTask
