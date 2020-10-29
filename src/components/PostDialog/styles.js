import { makeStyles } from '@material-ui/core/styles';

const postDialogStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#15202b',
    padding: '20px',
    borderRadius: '4px',
    [theme.breakpoints.up('sm')]: {
      border: '2px solid #fff',
      minHeight: '200px',
      minWidth: '500px',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '600px',
    },
  },
  header: {
    padding: theme.spacing(0, 0, 1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dialog: {
    '& .MuiPaper-root': {
      backgroundColor: '#15202b'
    }
  },
  close: {
    border: '1px solid #15202b',
    backgroundColor: '#15202b',
    color: '#fff',
    padding: theme.spacing(.5),
    '&:hover': {
      backgroundColor: '#15202b'
    }
  },
  captionbox: {
    display: 'flex',
    alignItems: 'center',
    flex: 1
  },
  avatar: {
    marginRight: theme.spacing(2),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  caption: {
    width: '90%',
    flex: 1,
    marginBottom: '10px',
    '& label': {
      color: '#999'
    },
    '& label.Mui-focused': {
      color: '#999',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: '#fff',
    },
    '& input:focus': {
      border: 'none'
    },
    borderBottom: '1px solid #fff'
  },
  imagediv: {
    minHeight: '150px',
    maxHeight: '300px',
    border: '1px solid #15202b',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: 0, height: 0
    }
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    marginBottom: '-20px',
  },
  footer: {
    alignItems: 'center',
    marginTop: '5px'
  },
  input: {
    display: 'none'
  },
  icon: {
    padding: '10px',
    border: '1px solid #15202b',
    color: '#15202b',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#fff'
    }
  },
  buttonDiv: {
    textAlign: 'right'
  },
  button: {
    width: '50%',
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
      border: '1px solid #999',
      '& span': {
        color: '#999'
      }
    },
  },
  spinner: {
    marginRight: theme.spacing(0.5)
  },
}
));

export default postDialogStyle;
