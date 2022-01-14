import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  searchPosts: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  postsPagination: {
    borderRadius: 4,
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '16px',
  },
  postGridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));