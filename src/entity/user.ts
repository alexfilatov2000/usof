import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { Post } from './post';
import { Like_to_comment } from './like_to_comment';
import { Like_to_post } from './like_to_post';
import { Comment } from './comment';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    @Index({ unique: true })
    login: string;

    @Column()
    @Index({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: '' })
    profile_picture: string;

    @Column({ default: 0 })
    rating: number;

    @Column({
        type: 'enum',
        enum: ['admin', 'user'],
        default: 'user',
    })
    role: 'admin' | 'user';

    @Column({ default: false })
    isVerified: boolean;

    @OneToMany('Post', (post: Post) => post.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    posts: Array<Post>;

    @OneToMany('Like_to_comment', (like: Like_to_comment) => like.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    likes_to_comment: Array<Like_to_comment>;

    @OneToMany('Like_to_post', (like: Like_to_post) => like.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    likes_to_post: Array<Like_to_post>;

    @OneToMany('Comment', (comment: Comment) => comment.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    comments: Array<Comment>;
}
