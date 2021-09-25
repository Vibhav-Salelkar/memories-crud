import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    ['@media (max-width:968px)']: { 
      flexDirection: 'column',
    },
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    ['@media (max-width:500px)']: { 
      fontSize: '3rem'
    },
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    ['@media (max-width:500px)']: { 
      justifyContent: 'center',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    ['@media (max-width:500px)']: { 
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      marginTop: 20
    },
  },
  userName: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));