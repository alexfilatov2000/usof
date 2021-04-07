import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Post } from './post';
import { User } from './user';

@Entity('like_to_post')
@Unique(['post_id', 'user_id'])
export class Like_to_post {
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
    post_id: number;

    @Column('int')
    user_id: number;

    @ManyToOne(() => Post, (post: Post) => post.likes_to_post, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @ManyToOne(() => User, (user: User) => user.likes_to_post, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
