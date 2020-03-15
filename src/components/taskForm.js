import React from 'react';
import { Card, Input, TextArea, Button, Form} from 'semantic-ui-react';
import MaskedInput from 'react-maskedinput';


export default function TaskForm(props) {

  let date = props.deadline;

  return(
    <div className='task-cell'>
      <Card color='teal'>
        <Card.Content>
          <Card.Header>
            <Input name='name'
              size='mini'
              placeholder='Название'
              onChange={props.handleInputChange}
              value={props.name}></Input>
          </Card.Header>
          <Card.Meta>
            <MaskedInput
                name="dateTime"
                mask={'11-11-1111 11:11'}
                value={date}
                onChange={props.handleDateChange}>
              </MaskedInput>
          </Card.Meta>
          <Card.Description>
            <Form>
              <TextArea name='description'
                placeholder='описание'
                onChange={props.handleInputChange}
                value={props.description}></TextArea>
            </Form>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic
            color='green'
            onClick={props.submit}>Отправить</Button>
          <Button basic
            color='red'
            onClick={props.cancel}>Отмена</Button>
        </Card.Content>
      </Card>
    </div>
  )
}
