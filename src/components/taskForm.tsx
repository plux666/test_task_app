import * as React from 'react';
import { Card, Input, TextArea, Button, Form} from 'semantic-ui-react';
import InputMask from "react-input-mask";


export interface Props {
  submit(info: object): any;
  handleInputChange(e: object): any;
  handleDateChange(e: any): any;
  name: string;
  deadline: string;
  description: string;
  cancel?(e: object): any;
}

const TaskForm : React.FC<Props> = (props: Props) => {

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
            <InputMask
                mask={'99-99-9999 99:99'}
                value={date}
                onChange={props.handleDateChange}>
            </InputMask>
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

export default TaskForm
