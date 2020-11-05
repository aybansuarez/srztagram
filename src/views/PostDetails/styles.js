import { makeStyles } from '@material-ui/core/styles';

export const postDetailsStyle = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(1.5),
    '& a': {
      color: '#fff'
    }
  },
  commentBox: {
    margin: theme.spacing(0, 1, 2),
    backgroundColor: '#15202b',
    border: '1px solid #666',
    borderTop: '5px solid #666'
  },
  commentForm: {
    display: 'flex',
    borderRadius: 0,
    marginTop: theme.spacing(1)
  },
  input: {
    paddingLeft: theme.spacing(1.5),
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
