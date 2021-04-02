import { getManager, Repository } from 'typeorm';
import { Post } from '../entity/post';
import { Comment } from '../entity/comment';
import { Category } from '../entity/category';
import { Like } from '../entity/like';
import { User } from '../entity/user';

export const findAllPosts = async (): Promise<Post[]> => {
    const postRepository: Repository<Post> = getManager().getRepository(Post);
    return postRepository.find();
};

export const findOnePost = async (id: number): Promise<Post> => {
    const postRepository: Repository<Post> = getManager().getRepository(Post);
    return postRepository.findOne(id);
};

export const findComments = async (id: number): Promise<Comment[]> => {
    const commentRepository: Repository<Comment> = getManager().getRepository(Comment);
    return commentRepository.find({ where: { post_id: id } });
};

export const findCategories = async (id: number): Promise<Category[]> => {
    const categoryRepository: Repository<Category> = getManager().getRepository(Category);
    return categoryRepository.find({ where: { post_id: id } });
};

export const findLikes = async (id: number): Promise<Like[]> => {
    const likeRepository: Repository<Like> = getManager().getRepository(Like);
    return likeRepository.find({ where: { post_id: id } });
};

export const createPostModel = async (data: Post, user: User): Promise<void> => {
    const postRepository: Repository<Post> = getManager().getRepository(Post);

    const postToBeSaved: Post = new Post();
    postToBeSaved.author = user.login;
    postToBeSaved.title = data.title;
    postToBeSaved.content = data.content;
    postToBeSaved.categories = data.categories;
    postToBeSaved.user_id = user.id;

    await postRepository.save(postToBeSaved);
};

export const createCommentModel = async (data: Comment, post_id: number, user: User): Promise<void> => {
    const commentRepository: Repository<Comment> = getManager().getRepository(Comment);

    const commentToBeSaved: Comment = new Comment();
    commentToBeSaved.author = user.login;
    commentToBeSaved.content = data.content;
    commentToBeSaved.post_id = post_id;

    await commentRepository.save(commentToBeSaved);
};

export const createLikeModel = async (data: Like, post_id: number, user: User): Promise<void> => {
    const likeRepository: Repository<Like> = getManager().getRepository(Like);

    const likeToBeSaved: Like = new Like();
    likeToBeSaved.author = user.login;
    likeToBeSaved.type = data.type;
    likeToBeSaved.post_id = post_id;
    likeToBeSaved.user_id = user.id;

    await likeRepository.save(likeToBeSaved);
};

export const updatePostModel = async (data: Post, post_id: number): Promise<void> => {
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
