import { makeStyles } from '@material-ui/core/styles';

const alertStyle = makeStyles((theme) => ({
  root: {

    '&.MuiAlert-standardSuccess': {
      backgroundColor: '#d4edda',
      color: '#155724',
    },
    '&.MuiAlert-standardError': {
      backgroundColor: '#f8d7da',
      color: '#721c24',
    },
    '& > .MuiAlert-icon': {
      alignItems: 'center',
      color: 'inherit'
    },
  }

}));

export default alertStyle;
