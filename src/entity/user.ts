import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, BeforeInsert } from 'typeorm';
import { Post } from './post';
import { Like } from './like';
import { Comment } from './comment';
import argon2 from "argon2";

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

    @OneToMany('Like', (like: Like) => like.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    likes: Array<Like>;

    @OneToMany('Comment', (comment: Comment) => comment.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    comments: Array<Like>;

    // @BeforeInsert()
    // async setPassword(password: string) {
    //     this.password = await argon2.hash(password || this.password);
    // }
}
