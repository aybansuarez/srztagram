import { makeStyles } from '@material-ui/core/styles';

const profileListStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(0),
  },
  item: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    borderBottom: '1px solid #c0c0c0'
  },
}));

export default profileListStyle;
