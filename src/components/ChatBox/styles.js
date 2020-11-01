import { makeStyles } from '@material-ui/core/styles';

const topbarStyle = makeStyles((theme) => ({
  header: {
    padding: '10px',
    backgroundColor: '#15202b',
    color: '#fff',
    fontWeight: 'bold',
    borderBottom: '5px solid #666',
    borderTop: '5px solid #666',
  },
  chatbox: {
    maxWidth: '684px',
    maxHeight: 'calc(100vh - 255px)',
    padding: theme.spacing(.5, 0),
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
    [theme.breakpoints.up('sm')]: {
      maxHeight: 'calc(100vh - 245px)',
    },
  },
  chatOne: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    margin: '2px 0',
  },
  chatTwo: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    margin: '2px 0',
  },
  chatAvatar: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 1)
    },
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0)
    },
  },
  chatMessageOne: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(1)
    },
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(0)
    },
  },
  chatMessageTwo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1)
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(0)
    },
  },
  message: {
    padding: theme.spacing(1),
    color: '#fff',
    borderRadius: '10px',
    wordBreak: 'break-word',
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
  },
  messageOne: {
    backgroundColor: '#223344',
  },
  messageTwo: {
    backgroundColor: '#666',
  },
  chatForm: {
    display: 'flex',
    height: '45px',
    borderRadius: 0,
  },
  input: {
    paddingLeft: '12px',
    color: '#183881',
  },
  button: {
    borderRadius: '0',
    color: '#15202b',
    border: 'none',
    '&:focus': {
      outline: 'none'
    },
  },

}));

export default topbarStyle;
