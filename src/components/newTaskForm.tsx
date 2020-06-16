import React, { useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import TaskForm from './taskForm';
import moment from 'moment';
import * as alertify from 'alertifyjs';


const dateFormat: string = 'DD-MM-YYYY hh:mm';

export interface Props {
  addNewTask(e: any): any;
}

export default function NewTaskForm(props: Props) {

  const [show, toggleShow] = React.useState(false);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [deadline, setDeadline] = React.useState('');

  useEffect(() => {
    if (show === false) {
      setName('');
      setDescription('');
      setDeadline('');
    }
  })

  function toggleForm(e?: any) {
    if (e) {
      e.stopPropagation();
    }
    toggleShow(!show);
  };

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


  function handleDateChange(e: { target: HTMLInputElement }) {
    let value = e.target.value;

    if (moment(value, dateFormat).format(dateFormat) !== 'Invalid date') {
      setDeadline(value)
    } else if (value.split('_').length === 1) {
      alertify.notify("Неправильная дата", "error", 10)
      setDeadline(value)
    } else {
      setDeadline(value)
    }
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

  function submit() {
    let deadlineDate: object = new Date(moment(deadline, dateFormat).format())

    if (!_validateDate(deadlineDate)) {
      return
    }

    if (!_validateName(name)) {
      return
    }

    props.addNewTask({
      name: name,
      description: description,
      deadline: deadlineDate
    })
    toggleForm(false)
  }

  if (show) {
    return(
      <div className='task-cell'>
        <TaskForm
          submit={submit}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          name={name}
          deadline={deadline}
          description={description}
          cancel={toggleForm}>
        </TaskForm>
      </div>
    )
  } else {
    return(
      <Button color='green' onClick={toggleForm}>Добавить</Button>
      )
  }
}
