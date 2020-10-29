import { makeStyles } from '@material-ui/core/styles';

const profileItemStyle = makeStyles((theme) => ({
  item: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    borderBottom: '1px solid #999',
    color: '#fff',
    '&:hover': {
      color: '#fff',
    }
  },
  username: {
    '& span': {
      fontWeight: 'bold'
    }
  },
}));

export default profileItemStyle;
