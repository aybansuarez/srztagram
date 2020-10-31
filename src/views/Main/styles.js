import { makeStyles } from '@material-ui/core/styles';

export const mainStyle = makeStyles((theme) => ({
  root: {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 3, 0),
    },
  },
  topbar: {
    position: 'sticky',
    top: '60px',
    zIndex: '1000',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  sidebar: {
    height: 'calc(100vh - 60px)',
    display: 'none',
    borderLeft: '1px solid #666',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flex: 1,
    },
    position: 'sticky',
    top: '60px'
  },
  main: {
    [theme.breakpoints.up('sm')]: {
      borderRight: '1px solid #666',
      borderLeft: '1px solid #666',
    },
  }
}));
