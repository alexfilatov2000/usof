import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { Post } from './post';
import { Like } from './like';

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
}
