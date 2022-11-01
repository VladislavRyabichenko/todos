import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  todoInput: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'whitesmoke',
      },
    },
    '& label.Mui-focused': {
      color: 'whitesmoke',
    },
  },
});

export default useStyles;
