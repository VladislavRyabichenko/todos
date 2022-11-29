import React from 'react';
// import { Input, Stack, Paper, Button, Checkbox } from '@mui/material';
import useStyles from './styles/todoExtraStyles';
import { DeleteForeverOutlined, BeenhereOutlined, BeenhereRounded } from '@material-ui/icons';
import { useManageTodo } from './useManageTodo';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import Flex from '../../UI/Flex';
import TextField from '../../UI/TextField';
import Container from '../../UI/Container';
import CheckboxWithIcons from '../../UI/Checkbox';
import ButtonDelete from '../../UI/ButtonDelete';

type TodoPropsType = {
  id: string;
  text: string;
  completed: boolean;
  index: number;
};

const Todo = ({ id, text, completed, index }: TodoPropsType) => {
  const { handleInputBlur, handleCheckbox, handleDelete } = useManageTodo({
    id,
    completed,
    useDispatch: useDispatch,
    useSelector: useSelector,
  });

  const classes = useStyles();

  return (
    <Draggable draggableId={id} index={index}>
      {(provided: any, snapshot: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-testid="test-todo-container"
        >
          <Container backgroundColor="white" margin="0">
            <Flex direction="column">
              <TextField
                height="40px"
                disabled={completed}
                defaultValue={text}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                  e.target.value !== text ? handleInputBlur(e) : null
                }
                data-testid="test-todo-input"
                role="todo-text-field"
              />

              <Flex justify="center">
                <CheckboxWithIcons
                  width="35px"
                  height="35px"
                  data-testid="test-todo-checkbox"
                  icon={<BeenhereOutlined />}
                  checkedIcon={<BeenhereRounded />}
                  checked={completed}
                  onClick={handleCheckbox}
                  margin="10px 0"
                />
                <ButtonDelete
                  onClick={handleDelete}
                  icon={<DeleteForeverOutlined fontSize="large" color="error" />}
                  backgroundColor="none"
                  width="35px"
                  height="35px"
                  data-testid="test-todo-delete-button"
                  margin="10px 0"
                />
                {/*<DeleteForeverOutlined fontSize="large" />*/}
                {/*</Button>*/}
              </Flex>
            </Flex>
          </Container>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
