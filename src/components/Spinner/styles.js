import { makeStyles } from '@material-ui/core/styles';

const spinnerStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(15),
    justifyContent: 'center',
    alignItems: 'center'
  },
}));

export default spinnerStyle;
