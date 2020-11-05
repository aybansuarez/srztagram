import { makeStyles } from '@material-ui/core/styles';

export const commentStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.25, 1.5),
    display: 'flex',
    alignItems: 'center'
  },
  username: {
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
    '& a': {
      color: '#fff'
    }
  },
}));
