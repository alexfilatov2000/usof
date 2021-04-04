import { getManager, Repository } from 'typeorm';
import { Comment } from '../entity/comment';
import { Like } from '../entity/like';
import { User } from '../entity/user';

export const findOneCommentModel = async (id: number): Promise<Comment> => {
    const comment: Repository<Comment> = getManager().getRepository(Comment);
    return comment.findOne(id);
};

export const findLikesModel = async (id: number): Promise<Like[]> => {
    const likes: Repository<Like> = getManager().getRepository(Like);
    return likes.find({ where: { comment_id: id } });
};

export const createLikeModel = async (id: number, user: User, bodyData: Like): Promise<void> => {
    const likeRepository: Repository<Like> = getManager().getRepository(Like);

    const like: Like = new Like();
    like.type = bodyData.type;
    like.comment_id = id;
    like.user_id = user.id;

    await likeRepository.save(like);
};

export const updateUserRatingModel = async (id: number, rating: number): Promise<void> => {
    const user: Repository<User> = getManager().getRepository(User);
    await user.update(id, { rating });
};

export const updateCommentModel = async (id: number, data: Comment): Promise<void> => {
    const comment: Repository<Comment> = getManager().getRepository(Comment);
    await comment.update(id, { content: data.content });
};

export const deleteCommentModel = async (id: number): Promise<void> => {
    const comment: Repository<Comment> = getManager().getRepository(Comment);
    await comment.delete(id);
};

export const findOneLikeUnderComment = async (comment_id: number, user_id: number): Promise<Like> => {
    const like: Repository<Like> = getManager().getRepository(Like);
    return like.findOne({ comment_id, user_id });
};

export const deleteLikeUnderComment = async (id: number): Promise<void> => {
    const like: Repository<Like> = getManager().getRepository(Like);
    await like.delete(id);
};
