import React from 'react';
import { Button, Stack, TextField, CircularProgress } from '@mui/material';
import useStyles from './styles/InputFormExtraStyles';
import { STATUS_LOADING } from '../../../constants/values';
import { useManageInputForm } from './useManageInputForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

const InputForm = () => {
  const { inputValue, handleInput, handleSubmit, status } = useManageInputForm({
    useDispatch: useAppDispatch,
    useSelector: useAppSelector,
  });

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} data-testid="test-input-form-container">
      <Stack direction="row" spacing={3}>
        <TextField
          id="input-todo-field"
          data-testid="test-input-form-text-field"
          label="Your TODO..."
          variant="outlined"
          placeholder="Your TODO"
          inputProps={{
            role: 'todo-input',
            // 'data-testid': 'test-input-form-text-field',
            style: {
              color: 'whitesmoke',
            },
          }}
          className={classes.todoInput}
          fullWidth
          value={inputValue}
          onChange={handleInput}
        />
        {status === STATUS_LOADING ? (
          <CircularProgress color="success" data-testid="test-input-form-loader" />
        ) : (
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            size="small"
            disabled={!inputValue.length}
            data-testid="test-input-form-button"
          >
            Add TODO
          </Button>
        )}
      </Stack>
    </form>
  );
};

export default InputForm;
