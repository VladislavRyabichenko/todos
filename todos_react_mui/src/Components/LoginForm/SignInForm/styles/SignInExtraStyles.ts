import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  inputField: {
    color: '#fff',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'whitesmoke',
      },
    },
    '& label.Mui-focused': {
      color: 'whitesmoke',
    },
  },
  btn: {
    margin: '8px 0',
    color: '#fff',
  },
  helpText: {
    padding: '5px',
    background: 'whitesmoke',
    borderRadius: '5px',
  },
});

export default useStyles;
