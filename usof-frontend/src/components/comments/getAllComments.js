// import {useDispatch, useSelector} from "react-redux";
// import {getRole} from "../../util/getRole";
// import {useEffect} from "react";
// import {getAllComments} from "../../redux/comments";
//
// const GetAllComments = () => {
//     const dispatch = useDispatch();
//     const post = useSelector(state => state.posts);
//     const user = useSelector(state => state.users)
//     const auth = useSelector(state => state.auth);
//     const comment = useSelector(state => state.comments);
//
//     //console.log(comment);
//
//     useEffect(() => {
//         if (post.specPost) dispatch(getAllComments(post.specPost.id))
//     }, [post])
//
//
//     return (
//         <div>
//
//         </div>
//     );
// }
//
// export default GetAllComments;