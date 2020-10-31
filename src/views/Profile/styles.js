import { makeStyles } from '@material-ui/core/styles';

export const profileStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(0),
  },
  item: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    borderBottom: '1px solid #666'
  },
  post: {
    margin: 'auto',
  },
}));
