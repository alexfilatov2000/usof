import { useHistory} from "react-router-dom";
import LogOut from "./LogOut";
import { useSelector } from "react-redux";
import {AppBar, Toolbar, Button, makeStyles, createMuiTheme, ThemeProvider} from "@material-ui/core"

export const useStyles = makeStyles({
    link: {
       margin: 10
    },
    title: {
        flexGrow: 1
    }
})

const Navbar = () => {
    const classes = useStyles();
    const user = useSelector(state => state.users);
    const history = useHistory()
    const guestLinks = (
        <div>
            <Button
                variant="contained"
                className={classes.link}
                onClick={() => history.push('/login') }
            >
                Log in
            </Button>

            <Button
                variant="contained"
                color="secondary"
                onClick={() => history.push('/register') }
            >
                Sign up
            </Button>
        </div>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <h1 className={classes.title}>The Usof Application</h1>

                <div className="links">
                    {user.token && <LogOut/>}
                    {!user.token && guestLinks}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;