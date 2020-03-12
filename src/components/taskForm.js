import React from 'react';
import { Card, Input, TextArea, Button, Form } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';

export default function TaskForm(props) {

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
            <DateTimeInput
                name="dateTime"
                placeholder="Date Time"
                value={props.deadline}
                iconPosition="left"
                onChange={props.handleDateChange}
              />
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
