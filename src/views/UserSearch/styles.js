import { makeStyles } from '@material-ui/core/styles';

export const userSearchStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6, 3),
  },
  search: {
    display: 'flex',
    borderRadius: '50px'
  },
  input: {
    color: '#15202b',
    paddingLeft: '12px'
  },
  list: {
    width: '100%',
    padding: theme.spacing(0),
    borderTop: '5px solid #666'
  },
  none: {
    paddingTop: theme.spacing(12),
    textAlign: 'center'
  }
}));
