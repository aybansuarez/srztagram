import { makeStyles } from '@material-ui/core/styles';

const headerStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#002456',
    color: '#edcf2e',
    alignItems: 'flex-start',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center'
    },
  },
  toolbar: {
    minHeight: '60px',
    padding: 0,
  },
  logo: {
    maxHeight: '20px',
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      maxHeight: '30px',
    },
  },
  textLogo: {
    maxHeight: '12px',
    [theme.breakpoints.up('sm')]: {
      maxHeight: '20px',
    },
  },
}));

export default headerStyle;
