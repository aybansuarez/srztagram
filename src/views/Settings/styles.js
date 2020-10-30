import { makeStyles } from '@material-ui/core/styles';

export const authStyle = makeStyles((theme) => ({
  switch: {
    '& label': {
      margin: 0,
    },
    '& .MuiFormControlLabel-label': {
      marginLeft: theme.spacing(1.5)
    },
    textAlign: 'right',
    '& .MuiSwitch-colorSecondary.Mui-checked': {
      color: '#fff',
    },
    '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#fff'
    }
  },
  header: {
    padding: theme.spacing(2.5, 0),
    marginBottom: theme.spacing(2),
    borderBottom: '1px solid #999'
  },
  fileInput: {
    display: 'none'
  },
  avatarLabel: {
    cursor: 'pointer',
    fontSize: '12px',
    marginTop: theme.spacing(1)
  },
  input: {
    '& label': {
      color: '#999'
    },
    '& label.Mui-focused': {
      color: '#999',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: '#fff',
    },
    '& input:focus': {
      border: 'none'
    },
    borderBottom: '1px solid #999',
    marginBottom: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1, 0, 1),
    border: '1px solid #fff',
    backgroundColor: '#15202b',
    '& span': {
      color: '#fff',
    },
    '&:hover, &:focus': {
      backgroundColor: '#15202b',
    },
    '&.Mui-disabled': {
      opacity: '0.5',
      '& span': {
        color: '#999'
      }
    },
  },
  avatarGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    order: 1,
    [theme.breakpoints.up('md')]: {
      order: 2,
    },
  },
  inputGrid: {
    order: 2,
    [theme.breakpoints.up('md')]: {
      order: 1,
    },
  },
  avatar: {
    width: '120px',
    height: '120px',
    cursor: 'pointer',
  },
}));
