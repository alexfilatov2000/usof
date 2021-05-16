import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Typography, Container, TextField, Button, makeStyles} from "@material-ui/core";
import { useState } from "react";
import {createCategory} from "../../redux/categories";
import CreatedSuccess from "./createCategory/createdSuccess";
import CreatedError from "./createCategory/createdError";

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: 25,
    },
    inputs: {
        paddingBottom: 20
    },
    title: {
        margin: '20px 0'
    },
}));

const CreateCategory = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(state => state.auth);
    const category = useSelector(state => state.categories);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {title, description};
        const set = { setTitle, setDescription }
        dispatch(createCategory(data, auth.token, history, set))
    }

    return (
        <Container>
            <Typography variant="h4" className={classes.title}>
                Create Category
            </Typography>

            {category.success && <CreatedSuccess/>}
            {category.error.msg && <CreatedError/>}

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField className={classes.inputs}
                           onChange={(e) => setTitle(e.target.value)}
                           label="Title"
                           name="title"
                           variant="outlined"
                           value={title}
                           required
                           fullWidth
                           error={category.error.title}
                />

                <TextField className={classes.inputs}
                           label="Description"
                           multiline
                           rows={10}
                           variant="outlined"
                           required
                           fullWidth
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                           error={category.error.description}
                />


                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"

                >
                    Publish your category
                </Button>
            </form>

        </Container>
    );
}

export default CreateCategory