import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { Post } from './post';

@Entity('users')
@Unique(['login', 'email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    login: string;

    @Column()
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
}
