import { getConnection, getManager, Repository } from 'typeorm';
import { Post } from '../entity/post';
import { Comment } from '../entity/comment';
import { Category } from '../entity/category';
import { Like_to_post } from '../entity/like_to_post';
import { User } from '../entity/user';

export const findAllPosts = async (): Promise<Post[]> => {
    const postRepository: Repository<Post> = getManager().getRepository(Post);
    return postRepository.find({ relations: ['categories'] });
};

export const findOnePost = async (id: number): Promise<Post> => {
    const postRepository: Repository<Post> = getManager().getRepository(Post);
    return postRepository.findOne(id, { relations: ['categories'] });
};

export const findComments = async (id: number): Promise<Comment[]> => {
    const commentRepository: Repository<Comment> = getManager().getRepository(Comment);
    return commentRepository.find({ where: { post_id: id } });
};

export const findCategories = async (id: number): Promise<Post> => {
    const postRepository: Repository<Post> = getManager().getRepository(Post);
    return postRepository.findOne(id, { relations: ['categories'] });

};

export const findLikes = async (id: number): Promise<Like_to_post[]> => {
    const likeRepository: Repository<Like_to_post> = getManager().getRepository(Like_to_post);
    return likeRepository.find({ where: { post_id: id } });
};

export const createPostModel = async (data: Post, user: User, categories: Category[]): Promise<void> => {
    const postRepository: Repository<Post> = getManager().getRepository(Post);

    const postToBeSaved: Post = new Post();
    postToBeSaved.title = data.title;
    postToBeSaved.content = data.content;
    postToBeSaved.categories = categories;
    postToBeSaved.user_id = user.id;
    await postRepository.save(postToBeSaved);

    console.dir(postToBeSaved);
};

export const createCommentModel = async (data: Comment, post_id: number, user: User): Promise<void> => {
    const commentRepository: Repository<Comment> = getManager().getRepository(Comment);

    const commentToBeSaved: Comment = new Comment();
    commentToBeSaved.content = data.content;
    commentToBeSaved.post_id = post_id;
    commentToBeSaved.user_id = user.id;

    await commentRepository.save(commentToBeSaved);
};

export const createLikeModel = async (data: Like_to_post, post_id: number, user: User): Promise<void> => {
    const likeRepository: Repository<Like_to_post> = getManager().getRepository(Like_to_post);

    const likeToBeSaved: Like_to_post = new Like_to_post();
    likeToBeSaved.type = data.type;
    likeToBeSaved.post_id = post_id;
    likeToBeSaved.user_id = user.id;

    await likeRepository.save(likeToBeSaved);
};

export const updatePostModel = async (data: Post, id: number): Promise<void> => {
    const postRepository: Repository<Post> = getManager().getRepository(Post);

    const post = await postRepository.findOne(id, { relations: ['categories'] });
    post.title = data.title;
    post.content = data.content;
    await postRepository.save(post);

    await getConnection()
        .createQueryBuilder()
        .relation(Post, 'categories')
        .of(id)
        .addAndRemove(
            data.categories,
            post.categories.map((c) => c.id),
        );
};

export const deletePostModel = async (id: number): Promise<void> => {
    const postRepository: Repository<Post> = getManager().getRepository(Post);
    await postRepository.delete(id);
};

export const deleteLikeUnderPost = async (id: number): Promise<void> => {
    const likeRepository: Repository<Like_to_post> = getManager().getRepository(Like_to_post);
    await likeRepository.delete(id);
};

export const findOneLikeUnderPost = async (post_id: number, user_id: number): Promise<Like_to_post> => {
    const likeRepository: Repository<Like_to_post> = getManager().getRepository(Like_to_post);
    return likeRepository.findOne({ post_id, user_id });
};

export const findByIdsModel = async (Ids: number[]): Promise<Category[]> => {
    const category: Repository<Category> = getManager().getRepository(Category);
    return category.findByIds(Ids);
};

export const findByTitlesModel = async (titles: string[]): Promise<Category[]> => {
    const category: Repository<Category> = getManager().getRepository(Category);
    let arr = [];
    for (let val of titles) {
        arr.push(await category.findOne({ where: {title: val} }));
    }

    return arr;
};