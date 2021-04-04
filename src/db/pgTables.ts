import { User } from '../entity/user';
import { Post } from '../entity/post';
import { Comment } from '../entity/comment';
import { Category } from '../entity/category';
import { Like } from '../entity/like';
// import { PostToCategory } from "../entity/postToCategory";

export const postgresTables = [User, Post, Comment, Category, Like];
