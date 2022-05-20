import {makeStyles} from "@material-ui/core";
import {useCallback,useEffect,useState} from 'react'

const useStyles = makeStyles((theme) => ({
    headerRoot:{
      display:'flex'
    },
    navlinks: {
      marginLeft: theme.spacing(10),
      display: "flex",
    },
   logo: {
      flexGrow: "1",
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      marginLeft: theme.spacing(20),
      "&:hover": {
        color: "yellow",
        borderBottom: "1px solid white",
      },
    },
  }));

export default useStyles;