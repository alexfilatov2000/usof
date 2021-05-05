import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Post } from './post';
import { Like_to_comment } from './like_to_comment';
import { User } from './user';

@Entity('comment')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    publish_date: string;

    @Column()
    content: string;

    @Column('int', { nullable: true })
    post_id: number;

    @Column('int', { nullable: true })
    user_id: number;

    @ManyToOne(() => Post, (post: Post) => post.comments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @ManyToOne(() => User, (user: User) => user.comments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Like_to_comment, (like: Like_to_comment) => like.comment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    likes_to_comment: Array<Like_to_comment>;
}
