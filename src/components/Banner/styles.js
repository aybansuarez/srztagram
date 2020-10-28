import { makeStyles } from '@material-ui/core/styles';

export const bannerStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 0),
    alignItems: 'center',
    width: '100%'
  },
  avatar: {
    width: '80px',
    height: '100%',
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: '100px',
    },
    [theme.breakpoints.up('md')]: {
      width: '120px',
    },
  },
  username: {
    backgroundColor: '#002456',
    padding: theme.spacing(2),
    color: '#fff',
    fontWeight: 'bold',
    alignItems: 'center'
  },
  button: {
    textAlign: 'end',
  },
  user: {
    marginLeft: theme.spacing(1),
  },
  display: {
    fontWeight: 'bold',
  },
  caption: {
    fontSize: '.8rem',
    color: '#888'
  },
  active: {
    fontWeight: 'bold'
  },
  stats: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#002456',
    padding: '10px',
    color: '#fff',
    '& a': {
      color: '#fff',
      textDecoration: 'none'
    }
  },
}));
