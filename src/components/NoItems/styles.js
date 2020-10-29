import { makeStyles } from '@material-ui/core/styles';

const noAccessStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(10),
    textAlign: 'center'
  },
  avatar: {
    margin: 'auto',
    marginBottom: theme.spacing(1),
    color: '#15202b',
    backgroundColor: '#fff'
  },

}));

export default noAccessStyle;
