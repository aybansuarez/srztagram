import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/srztagram.png';

export const authStyle = makeStyles((theme) => ({
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
      color: '#666'
    },
    '& label.Mui-focused': {
      color: '#666',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: '#fff',
    },
    '& input:focus': {
      border: 'none'
    },
    borderBottom: '1px solid #666'
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
        color: '#666'
      }
    },
  },
  footer: {
    justifyContent: 'center',
    color: '#666',
    marginTop: theme.spacing(1)

  },
  spinner: {
    marginRight: theme.spacing(0.5)
  },
  link: {
    textDecoration: 'none',
    margin: theme.spacing(0, 0.3),
    color: '#fff',
    '&:hover, &:focus': {
      color: '#fff',
    }
  },
  iconDiv: {
    '& svg': {
      fontSize: '80px'
    }
  },
  success: {
    color: 'green'
  },
  error: {
    color: 'red'
  },
  verifyLogo: {
    display: 'block',
    margin: '10px auto 0'
  },
  verifyRoot: {
    textAlign: 'center'
  },
  divider: {
    borderColor: '#fff'
  },
  message: {
    paddingBottom: theme.spacing(1)
  },
}));
