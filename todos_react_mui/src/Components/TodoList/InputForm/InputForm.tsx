import React from 'react';
// import { Button, Stack, TextField, CircularProgress } from '@mui/material';
import useStyles from './styles/InputFormExtraStyles';
import { STATUS_LOADING } from '../../../constants/values';
import { useManageInputForm } from './useManageInputForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Flex from '../../UI/Flex';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { CircularProgress } from '@mui/material';
const InputForm = () => {
  const { inputValue, handleInput, handleSubmit, status } = useManageInputForm({
    useDispatch: useAppDispatch,
    useSelector: useAppSelector,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" data-testid="test-input-form-container">
        <Flex width="100%" height="60px">
          <Flex width="100%">
            <Input
              value={inputValue}
              onChange={handleInput}
              data-testid="test-input-form-text-field"
              role="todo-input"
              placeholder="Your TODO..."
            />
          </Flex>
          <Flex width="100px" justify="center" align="center">
            {status === STATUS_LOADING ? (
              <CircularProgress color="success" data-testid="test-input-form-loader" />
            ) : (
              <Button
                type="submit"
                text="ADD TODO"
                width="100px"
                disabled={!inputValue.length}
                data-testid="test-input-form-button"
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    </form>

    // <form onSubmit={handleSubmit} data-testid="test-input-form-container">
    //   <Stack direction="row" spacing={3}>
    //     <TextField
    //       id="input-todo-field"
    //       data-testid="test-input-form-text-field"
    //       label="Your TODO..."
    //       variant="outlined"
    //       placeholder="Your TODO"
    //       inputProps={{
    //         role: 'todo-input',
    //         // 'data-testid': 'test-input-form-text-field',
    //         style: {
    //           color: 'whitesmoke',
    //         },
    //       }}
    //       className={classes.todoInput}
    //       fullWidth
    //       value={inputValue}
    //       onChange={handleInput}
    //     />
    //     {status === STATUS_LOADING ? (
    //       <CircularProgress color="success" data-testid="test-input-form-loader" />
    //     ) : (
    //       <Button
    //         variant="contained"
    //         type="submit"
    //         color="secondary"
    //         size="small"
    //         disabled={!inputValue.length}
    //         data-testid="test-input-form-button"
    //       >
    //         Add TODO
    //       </Button>
    //     )}
    //   </Stack>
    // </form>
  );
};

export default InputForm;
