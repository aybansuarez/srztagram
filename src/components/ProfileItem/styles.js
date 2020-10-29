import { makeStyles } from '@material-ui/core/styles';

const profileItemStyle = makeStyles((theme) => ({
  item: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    borderBottom: '1px solid #999'
  },
}));

export default profileItemStyle;
