import { makeStyles } from '@material-ui/core/styles';

export const buttonStyle = makeStyles((theme) => ({
  like: {
    fontSize: '20px',
    cursor: 'pointer',
    color: '#fff'
  },
  unlike: {
    fontSize: '20px',
    cursor: 'pointer',
    color: 'red'
  },
}));
