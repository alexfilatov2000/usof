import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles({
    field: {
        marginTop: 10,
        marginBottom: 10,
        display: 'block',
        borderRadius: 5
    },
    main: {
        marginTop: 20,
        backgroundColor: "#eff0f1",
        width: '20%',
        paddingBottom: 20,
        paddingTop: 20,
        borderRadius: 30
    },
    over: {
        backgroundColor: "gray",
    },
    error: {
        color: "red",
        fontWeight: "bold",
        border: "1px solid red",
        borderRadius: 5,
        padding: 5,
        marginBottom: 5
    }
})