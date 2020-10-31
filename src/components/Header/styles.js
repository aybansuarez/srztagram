import { makeStyles } from '@material-ui/core/styles';

const headerStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#15202b',
    color: '#edcf2e',
    alignItems: 'flex-start',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center'
    },
  },
  header: {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 3)
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '60px',
    padding: theme.spacing(0, 2.1),
    [theme.breakpoints.up('sm')]: {
      borderRight: '1px solid #666',
      borderLeft: '1px solid #666',
    },
    borderBottom: '1px solid #666',
  },
  button: {
    color: '#fff',
    padding: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
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
