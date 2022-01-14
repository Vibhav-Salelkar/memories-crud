import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    margin: '0 0 10px 0',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.1)',
    padding: '5px 0 5px 25px',
    ['@media (max-width:600px)']: { 
      flexDirection: 'column',
    },
  },
  navLogoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: "none"
  },
  navLogo: {
    fontSize: "2rem",
    fontFamily: "Roboto Slab",
    boxSizing: "border-box",
    color: "#ff3f6c"
  },
  navLogoSecondary: {
    color: "#333"
  },
  navProfileSection: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    ['@media (max-width:600px)']: { 
      justifyContent: 'center',
    },
  },
  navUserProfile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    ['@media (max-width:600px)']: { 
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      marginTop: 15
    },
  },
  navProfile: {
    display: 'flex',
  },
  navUserName: {
    marginLeft: '0.6rem',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    ['@media (max-width:600px)']: { 
      marginBottom: 25
    },
  },
  navAvatarColor: {
    color: '#fff',
    backgroundColor: '#612897',
  },
}));