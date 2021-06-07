import { useHistory} from "react-router-dom";
import LogOut from "./auth/LogOut";
import { useSelector } from "react-redux";
import { useStyles } from "../styles/navStyles";
import { AppBar, Toolbar, Button, Link, Typography, Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { getRole } from "../util/getRole";

const Navbar = ({ children }) => {
    const classes = useStyles();
    const user = useSelector(state => state.auth);
    const role = getRole(user.token);

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

    const publicItems = [
        {
            text: 'Home',
            path: '/'
        },
        {
            text: 'Users',
            path: '/users'
        },
        {
            text: 'Categories',
            path: '/categories'
        },
        {
            text: 'Posts',
            path: '/posts'
        },
    ];

    const privateItems = [
        {
            text: 'Create User',
            path: '/userCreate'
        },
        {
            text: 'Create Category',
            path: '/categoryCreate'
        }
    ];

    const mapPrivateItems = (
        <div>
            <br/>
            <Typography variant="h6" color="textSecondary" className={classes.adminTitle}>
                PRIVATE
            </Typography>
            <List>
                {privateItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => history.push(item.path)}
                    >
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </div>
    )

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
                    <Typography variant="h6" className={classes.sideTitle} color="textSecondary">
                        PUBLIC
                    </Typography>
                </div>

                <List>
                    {publicItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                        >
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>

                {role === 'admin' && mapPrivateItems}

            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}/>
                { children }
            </div>
        </div>
    );
}

export default Navbar;