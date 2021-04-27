import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { fetchVerifyEmail } from "../redux/users";
import {Box, createMuiTheme, makeStyles, MuiThemeProvider, Typography} from "@material-ui/core";
import {useEffect} from "react";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import {parseJwt} from "../util/parseToken";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#77c43e"
        },
        secondary: {
            main: "#FF0000"
        }
    },
    typography: {
        fontSize: 60
    }
})

const useStyles = makeStyles({
    title: {
        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 52%, rgba(0,212,255,1) 100%)",
        color: "white",
        margin: "20px 0",
        height: 150
    },
    indent: {
        margin: 20
    },
    email: {
        fontWeight: "bold",
        fontFamily: "Arial",
        fontSize: 22
    }
})

const VerifyEmail = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const { token } = useParams();
    const data = parseJwt(token);

    useEffect(() => {
        dispatch(fetchVerifyEmail(token))
    },[])

    const Error = (
        <div>
            <Box display="flex" justifyContent="center" alignItems="center">
                <MuiThemeProvider theme={theme}>
                    <ErrorIcon fontSize="large" color="secondary"/>
                </MuiThemeProvider>
            </Box>

            <Box className={classes.indent} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h5">
                    Email Address NOT Verified "{user.error}"
                </Typography>
            </Box>
        </div>
    );

    const Success = (
        <div>
            <Box display="flex" justifyContent="center" alignItems="center">
                <MuiThemeProvider theme={theme}>
                    <CheckCircleIcon fontSize="large" color="primary"/>
                </MuiThemeProvider>
            </Box>

            <Box className={classes.indent} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h5">
                    Email Address Verified
                </Typography>
            </Box>

            <Box className={classes.indent} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6">
                    <span className={classes.email}>{data.user.email}</span> has been verified.
                </Typography>
            </Box>
        </div>
    );


    return (
        <div>

            <Box className={classes.title} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h3">
                    Verify Email Address
                </Typography>
            </Box>

            {user.error && Error}
            {!user.error && Success}


        </div>
    );
}

export default VerifyEmail;
