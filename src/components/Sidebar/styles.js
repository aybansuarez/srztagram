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
    }
  },
  spacer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  create: {
    margin: '20px',
    backgroundColor: '#002456',
    color: '#fff',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#002456',
    }
  },
  active: {
    backgroundColor: '#002456',
    color: '#fff',
    '& span': {
      color: '#fff',
      fontWeight: 'bold'
    },
    '& .MuiAvatar-colorDefault': {
      backgroundColor: '#fff',
      color: '#002456'
    },
  }
}
));

export default sidebarStyle;
