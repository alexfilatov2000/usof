import {makeStyles} from "@material-ui/core";

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
    link: {
        margin: 10
    },
    title: {
        flexGrow: 1,
    },
    sideTitle: {
        padding: theme.spacing(2),
    },
    adminTitle: {
        paddingLeft: theme.spacing(2),
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