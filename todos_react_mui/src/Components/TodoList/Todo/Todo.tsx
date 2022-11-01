import React from 'react';
import { Input, Stack, Paper, Button, Checkbox } from '@mui/material';
import useStyles from './styles/todoExtraStyles';
import { DeleteForeverOutlined, BeenhereOutlined, BeenhereRounded } from '@material-ui/icons';
import { useManageTodo } from './useManageTodo';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

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
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.todoItem}
          data-testid="test-todo-container"
        >
          <Stack spacing={3} direction="column" alignContent="space-between">
            <Input
              data-testid="test-todo-input"
              size="small"
              inputProps={{
                role: 'todo-text-field',
                style: {
                  textAlign: 'center',
                  textDecoration: completed ? 'line-through' : 'none',
                },
              }}
              disabled={completed}
              defaultValue={text}
              onBlur={handleInputBlur}
            />
            <Stack direction="row" justifyContent="center">
              <Checkbox
                data-testid="test-todo-checkbox"
                icon={<BeenhereOutlined />}
                checkedIcon={<BeenhereRounded />}
                color="success"
                checked={completed}
                onClick={handleCheckbox}
              />
              <Button color="error" onClick={handleDelete} data-testid="test-todo-delete-button">
                <DeleteForeverOutlined fontSize="large" />
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
};

export default Todo;
