import { makeStyles } from '@material-ui/core/styles';

const topbarStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 0,
    height: '30px',
    display: 'flex',
    backgroundColor: '#15202b'
  },
  active: {
    backgroundColor: '#fff',
    '& .MuiSvgIcon-root': {
      color: '#15202b',
    }
  },
  button: {
    color: '#fff',
    '&.MuiBottomNavigationAction-root.MuiBottomNavigationAction-iconOnly': {
      padding: 0,
      minWidth: 0,
    }
  },
  floatBtn: {
    position: 'fixed',
    bottom: theme.spacing(1.5),
    right: theme.spacing(1.5),
    backgroundColor: '#15202b',
    border: '3px solid #fff',
    color: '#fff'
  }
}));

export default topbarStyle;
