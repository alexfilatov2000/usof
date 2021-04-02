import { getManager, Repository } from 'typeorm';
import { Post } from '../entity/post';
import { Comment } from '../entity/comment';
import { Category } from '../entity/category';
import { Like } from '../entity/like';

export const findAllPosts = async () => {
    const postRepository: Repository<Post> = getManager().getRepository(Post);
    return postRepository.find();
};

export const findOnePost = async (id) => {
    const postRepository: Repository<Post> = getManager().getRepository(Post);
    return postRepository.findOne(id);
};

export const findComments = async (id): Promise<Comment[]> => {
    const commentRepository: Repository<Comment> = getManager().getRepository(Comment);
    return commentRepository.find({ where: { post_id: id } });
};

export const findCategories = async (id): Promise<Category[]> => {
    const categoryRepository: Repository<Category> = getManager().getRepository(Category);
    return categoryRepository.find({ where: { post_id: id } });
};

export const findLikes = async (id): Promise<Like[]> => {
    const likeRepository: Repository<Like> = getManager().getRepository(Like);
    return likeRepository.find({ where: { post_id: id } });
};

export const createPostModel = async (data): Promise<void> => {
    const postRepository: Repository<Post> = getManager().getRepository(Post);

    const postToBeSaved: Post = new Post();
    postToBeSaved.author = data.userByToken.login;
    postToBeSaved.title = data.title;
    postToBeSaved.content = data.content;
    postToBeSaved.categories = data.categories;
    postToBeSaved.user_id = data.userByToken.id;

    await postRepository.save(postToBeSaved);
};

export const createCommentModel = async (data, post_id): Promise<void> => {
    const commentRepository: Repository<Comment> = getManager().getRepository(Comment);

    const commentToBeSaved: Comment = new Comment();
    commentToBeSaved.author = data.userByToken.login;
    commentToBeSaved.content = data.content;
    commentToBeSaved.post_id = post_id;

    await commentRepository.save(commentToBeSaved);
};

export const createLikeModel = async (data, post_id: number): Promise<void> => {
    const likeRepository: Repository<Like> = getManager().getRepository(Like);

    const likeToBeSaved: Like = new Like();
    likeToBeSaved.author = data.userByToken.login;
    likeToBeSaved.type = data.type;
    likeToBeSaved.post_id = post_id;
    likeToBeSaved.user_id = data.userByToken.id;

    await likeRepository.save(likeToBeSaved);
};

export const updatePostModel = async (data: Post, post_id): Promise<void> => {
    const postRepository: Repository<Post> = getManager().getRepository(Post);
    await postRepository.update(post_id, {
        title: data.title,
        content: data.content,
        categories: data.categories,
    });
};

export const deletePostModel = async (id: number): Promise<void> => {
    const postRepository: Repository<Post> = getManager().getRepository(Post);
    await postRepository.delete(id);
};

export const deleteLikeModel = async (post_id: number, user_id: number): Promise<void> => {
    const likeRepository: Repository<Like> = getManager().getRepository(Like);
    await likeRepository.delete({ post_id, user_id });
};
