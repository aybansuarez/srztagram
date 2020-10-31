import { makeStyles } from '@material-ui/core/styles';

export const messageStyle = makeStyles((theme) => ({
  root: {
    overflowX: 'auto',
    alignItems: 'center',
    flexWrap: 'nowrap',
    display: 'flex',
    maxWidth: '682px',
    height: '70px',
    [theme.breakpoints.up('sm')]: {
      height: '90px',
    },
  },
  avatar: {
    '& .MuiAvatar-root': {
      cursor: 'pointer',
      width: '50px',
      height: '50px',
      [theme.breakpoints.up('sm')]: {
        width: '70px',
        height: '70px',
      },
    },
    '& .MuiAvatar-root img': {
      filter: 'grayscale(1)',

    },
    '&.active .MuiAvatar-circle': {
      boxShadow: '0 0 5px #fff',
    },
    '&.active .MuiAvatar-root img': {
      borderRadius: '50%',
      border: '5px solid #15202b',
      filter: 'none'
    }
  },
  select: {
    paddingTop: '100px',
    textAlign: 'center',
    borderTop: '5px solid #666'
  },
  chats: {
    padding: theme.spacing(0, 1)
  },
}));
