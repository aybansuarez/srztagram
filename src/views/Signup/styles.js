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
  media: {
    backgroundColor: '#002456',
    background: `url(${logo}) no-repeat center`,
    backgroundSize: '180px',
    height: '100px',
    textAlign: 'center',
    width: 'inherit'
  },
  button: {
    margin: theme.spacing(1, 0, 1),
    backgroundColor: '#002456',
    '&:hover, &:focus': {
      backgroundColor: '#002456',
    },
    '&.Mui-disabled': {
      backgroundColor: '#183881',
      opacity: '0.9',
      color: '#fff'
    },
    borderColor: '#002456',
    color: '#fff',
  },
  footer: {
    justifyContent: 'center',
    marginTop: theme.spacing(1)
  },
  spinner: {
    marginRight: theme.spacing(0.5)
  },
  link: {
    textDecoration: 'none',
    marginLeft: theme.spacing(0.3),
    color: '#183881'
  }
}));
