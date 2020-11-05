import { makeStyles } from '@material-ui/core/styles';

export const postStyle = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 1),
    backgroundColor: '#15202b',
    border: '1px solid #666',
  },
  container: {
    padding: theme.spacing(1, 1.5),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    '& p': {
      color: '#fff',
      fontWeight: 'bold',
    },
    '&:hover': {
      color: '#fff'
    },
    '& .MuiAvatar-root.MuiAvatar-circle': {
      marginRight: theme.spacing(1)
    }
  },
  likes: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    padding: theme.spacing(0),
    marginRight: theme.spacing(0.5),
    '&:focus': {
      outline: 'none'
    },
  },
  span: {
    cursor: 'pointer',
    fontSize: '12px',
    margin: theme.spacing(0),
    '& a': {
      color: '#fff'
    }
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  username: {
    fontWeight: 'bold',
    '& a': {
      color: '#fff'
    }
  },
  authorIcon: {
    margin: theme.spacing(0.5),
    color: '#666',
    '& svg': {
      fontSize: '16px'
    }
  },

}));
