import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  avatar: {
    margin: 'auto',
    // backgroundColor: 'red !important',
  },
  container: {
    width: '600px',
    padding: '20px',
    borderRadius: '10px',
    background: 'rgba(238,60,118,1)',
  },

  tab: {
    '& .MuiButtonBase-root.MuiTab-root': {
      fontSize: '16px',
      color: 'whitesmoke',
    },

    '& .Mui-selected': {
      textDecoration: 'underline',
      backgroundColor: 'rgba(91,11,141)',
      borderRadius: '10px',
    },
  },
});
export default useStyles;
