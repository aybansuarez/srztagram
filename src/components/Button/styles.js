import { makeStyles } from '@material-ui/core/styles';

export const buttonStyle = makeStyles((theme) => ({
  like: {
    fontSize: '20px',
    cursor: 'pointer',
    color: '#15202b'
  },
  unlike: {
    fontSize: '20px',
    cursor: 'pointer',
    color: 'red'
  },
}));
