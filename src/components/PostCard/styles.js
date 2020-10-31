import { makeStyles } from '@material-ui/core/styles';

const postCardStyle = makeStyles((theme) => ({
  imageDiv: {
    height: '100px',
    width: '100px',
    margin: 'auto',
    '@media (min-width:375px)': {
      height: '115px',
      width: '115px',
    },
    '@media (min-width:425px)': {
      height: '135px',
      width: '135px',
    },
    '@media (min-width:475px)': {
      height: '150px',
      width: '150px',
    },
    '@media (min-width:525px)': {
      height: '170px',
      width: '170px',
    },
    '@media (min-width:575px)': {
      height: '185pzx',
      width: '185pzx',
    },
    [theme.breakpoints.up('sm')]: {
      height: '110px',
      width: '110px',
    },
    '@media (min-width:650px)': {
      height: '125px',
      width: '125px',
    },
    '@media (min-width:700px)': {
      height: '135px',
      width: '135px',
    },
    '@media (min-width:750px)': {
      height: '150px',
      width: '150px',
    },
    '@media (min-width:800px)': {
      height: '160px',
      width: '160px',
    },
    '@media (min-width:900px)': {
      height: '180px',
      width: '180px',
    },
    [theme.breakpoints.up('md')]: {
      height: '215px',
      width: '215px',
      marginTop: '2px'
    },
    border: '1px solid #15202b',
  },
  image: {
    objectFit: 'auto',
    height: '100%',
  }
}));

export default postCardStyle;
