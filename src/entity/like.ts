import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Post } from './post';
import { User } from './user';

@Entity('like')
@Unique(['post_id', 'user_id'])
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;

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

    @Column('int')
    user_id: number;

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
}
