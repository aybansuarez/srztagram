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
    backgroundColor: '#15202b',
    padding: theme.spacing(2),
    color: '#fff',
    fontWeight: 'bold',
    alignItems: 'center',
    borderBottom: '1px solid #555'
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
    fontWeight: 'bold',
    borderBottom: '2px solid #fff',
    borderTop: '2px solid #15202b'
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    borderTop: '1px solid #555',
    borderBottom: '1px solid #555',
    alignItems: 'center',
    textAlign: 'center',
    '& a': {
      color: '#fff',
      padding: theme.spacing(1),
      flex: 1,
      textDecoration: 'none'
    }
  },
}));
