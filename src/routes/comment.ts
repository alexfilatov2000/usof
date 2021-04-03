import Router from 'koa-router';
import CommentController from '../controllers/comment';
import {auth} from "../middleware/userAuth";

const CommentRouter = new Router();

CommentRouter.get('/api/comments/:id', CommentController.getComment);
CommentRouter.get('/api/comments/:id/like', CommentController.getAllLikesByCommentId);

CommentRouter.post('/api/comments/:id/like', auth, CommentController.createLike);
CommentRouter.patch('/api/comments/:id', auth, CommentController.updateComment);
CommentRouter.delete('/api/comments/:id', auth, CommentController.deleteComment);
CommentRouter.delete('/api/comments/:id/like', auth, CommentController.deleteLikeUnderComment);

export default CommentRouter.routes();