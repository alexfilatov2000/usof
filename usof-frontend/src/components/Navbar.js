import { useHistory} from "react-router-dom";
import LogOut from "./auth/LogOut";
import { useSelector } from "react-redux";
import {
    AppBar,
    Toolbar,
    Button,
    makeStyles,
    Link,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core"

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    link: {
       margin: 10
    },
    title: {
        flexGrow: 1,
    },
    sideTitle: {
        padding: theme.spacing(2),
        // textAlign: "center"
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    root: {
        display: 'flex',
    },
    page: {
        // background: '#f9f9f9',
        width: '100%',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
}));

const Navbar = ({ children }) => {
    const classes = useStyles();
    const user = useSelector(state => state.auth);
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

    const menuItems = [
        {
            text: 'Users',
            path: '/users'
        },
        {
            text: 'Categories',
            path: '/categories'
        },
    ];

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Link href="/" color="inherit" variant="h5" className={classes.title}>The Usof Application</Link>

                    <div className="links">
                        {user.token && <LogOut/>}
                        {!user.token && guestLinks}
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
                anchor="left"
            >
                <div>
                    <Typography variant="h5" className={classes.sideTitle}>
                        Notes
                    </Typography>
                </div>

                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                        >
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>

            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}/>
                { children }
            </div>
        </div>
    );
}

export default Navbar;