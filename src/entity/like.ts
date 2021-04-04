import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Post } from './post';
import { User } from './user';
import { Comment } from './comment';

@Entity('like')
@Unique(['post_id', 'user_id'])
@Unique(['comment_id', 'user_id'])
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    publish_date: string;

    @Column({
        type: 'enum',
        enum: ['like', 'dislike'],
        default: 'like',
    })
    type: 'like' | 'dislike';

    @Column('int', { nullable: true })
    post_id: number;

    @Column('int', { nullable: true })
    user_id: number;

    @Column('int', { nullable: true })
    comment_id: number;

    @ManyToOne(() => Post, (post: Post) => post.likes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @ManyToOne(() => User, (user: User) => user.likes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Comment, (comment: Comment) => comment.likes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'comment_id' })
    comment: Comment;
}
