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
    fontWeight: 'bold'
  },
  stats: {
    borderTop: '1px solid #555',
    borderBottom: '1px solid #555',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '10px',
    '& a': {
      color: '#fff',
      textDecoration: 'none'
    }
  },
}));
