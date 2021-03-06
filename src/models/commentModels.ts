import { getManager, Repository } from 'typeorm';
import { Comment } from '../entity/comment';
import { Like_to_comment } from '../entity/like_to_comment';
import { User } from '../entity/user';

export const findOneCommentModel = async (id: number): Promise<Comment> => {
    const comment: Repository<Comment> = getManager().getRepository(Comment);
    return comment.findOne(id);
};

export const findLikesModel = async (id: number): Promise<Like_to_comment[]> => {
    const likes: Repository<Like_to_comment> = getManager().getRepository(Like_to_comment);
    return likes.find({ where: { comment_id: id } });
};

export const createLikeModel = async (id: number, user: User, bodyData: Like_to_comment): Promise<void> => {
    const likeRepository: Repository<Like_to_comment> = getManager().getRepository(Like_to_comment);

    const like: Like_to_comment = new Like_to_comment();
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

export const findOneLikeUnderComment = async (comment_id: number, user_id: number): Promise<Like_to_comment> => {
    const like: Repository<Like_to_comment> = getManager().getRepository(Like_to_comment);
    return like.findOne({ comment_id, user_id });
};

export const deleteLikeUnderComment = async (id: number): Promise<void> => {
    const like: Repository<Like_to_comment> = getManager().getRepository(Like_to_comment);
    await like.delete(id);
};
