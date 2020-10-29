import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/srztagram.png';

export const signupStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  input: {
    '& label': {
      color: '#999'
    },
    '& input:focus': {
      border: 'none'
    },
    borderBottom: '1px solid #fff'
  },
  media: {
    background: `url(${logo}) no-repeat center`,
    backgroundSize: '180px',
    height: '100px',
    textAlign: 'center',
    width: 'inherit',
    border: '1px solid #fff'
  },
  button: {
    margin: theme.spacing(1, 0, 1),
    border: '1px solid #fff',
    backgroundColor: '#15202b',
    '& span': {
      color: '#fff',
    },
    '&:hover, &:focus': {
      backgroundColor: '#15202b',
    },
    '&.Mui-disabled': {
      opacity: '0.5',
      '& span': {
        color: '#999'
      }
    },
  },
  footer: {
    justifyContent: 'center',
    color: '#999',
    marginTop: theme.spacing(1)

  },
  spinner: {
    marginRight: theme.spacing(0.5)
  },
  link: {
    textDecoration: 'none',
    marginLeft: theme.spacing(0.3),
    color: '#fff',
    '&:hover, &:focus': {
      color: '#fff',
    }
  }
}));
