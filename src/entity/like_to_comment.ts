import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { User } from './user';
import { Comment } from './comment';

@Entity('like_to_comment')
@Unique(['comment_id', 'user_id'])
export class Like_to_comment {
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

    @Column('int')
    user_id: number;

    @Column('int')
    comment_id: number;

    @ManyToOne(() => User, (user: User) => user.likes_to_comment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Comment, (comment: Comment) => comment.likes_to_comment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'comment_id' })
    comment: Comment;
}
