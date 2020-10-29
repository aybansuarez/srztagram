import { makeStyles } from '@material-ui/core/styles';

export const mainStyle = makeStyles((theme) => ({
  root: {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 3, 0),
    },
  },
  sidebar: {
    height: 'calc(100vh - 60px)',
    display: 'none',
    borderLeft: '1px solid #999',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flex: 1,
    },
    position: 'sticky',
    top: '60px'
  },
  main: {
    [theme.breakpoints.up('sm')]: {
      borderRight: '1px solid #999',
      borderLeft: '1px solid #999',
    },
  }
}));
