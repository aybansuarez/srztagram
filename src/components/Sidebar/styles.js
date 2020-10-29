import { makeStyles } from '@material-ui/core/styles';

const sidebarStyle = makeStyles((theme) => ({
  list: {
    width: '100%',
    padding: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    '& a': {
      textDecoration: 'none',
      color: 'inherit'
    },
    '& .MuiAvatar-colorDefault': {
      backgroundColor: '#fff',
      color: '#15202b',
    },
  },
  spacer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  create: {
    margin: '20px',
    backgroundColor: '#15202b',
    border: '1px solid #fff',
    color: '#fff',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#15202b',
    }
  },
  active: {
    color: '#fff',
    '& span': {
      color: '#fff',
      fontWeight: 'bold'
    },
    '& .MuiAvatar-colorDefault': {
      backgroundColor: '#15202b',
      color: '#fff',
      border: '1px solid #fff'
    },
  }
}
));

export default sidebarStyle;
