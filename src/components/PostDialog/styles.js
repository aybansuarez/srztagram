import { makeStyles } from '@material-ui/core/styles';

const postDialogStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    borderRadius: '4px',
    [theme.breakpoints.up('sm')]: {
      border: '3px solid #002456',
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
  close: {
    border: '1px solid #002456',
    backgroundColor: '#002456',
    color: '#fff',
    padding: theme.spacing(.5),
    '&:hover': {
      backgroundColor: '#002456'
    }
  },
  captionbox: {
    display: 'flex',
    alignItems: 'center',
    flex: 1
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  caption: {
    width: '90%',
    flex: 1,
    marginBottom: '10px'
  },
  imagediv: {
    minHeight: '200px',
    maxHeight: '300px',
    border: '1px solid #002456',
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
    border: '1px solid #002456',
    color: '#fff',
    backgroundColor: '#002456',
    '&:hover': {
      backgroundColor: '#002456'
    }
  },
  buttonDiv: {
    textAlign: 'right'
  },
  button: {
    width: '50%',
    backgroundColor: '#002456',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#002456'
    },
    '&.Mui-disabled': {
      backgroundColor: '#183881',
      opacity: '0.9',
      color: '#fff'
    },
  },
  spinner: {
    marginRight: theme.spacing(0.5)
  },
}
));

export default postDialogStyle;
