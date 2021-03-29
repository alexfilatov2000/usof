import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './post';

@Entity('like')
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    publish_date: string;

    @Column({
        type: 'enum',
        enum: ['like', 'dislike'],
        default: 'like',
    })
    type: 'like' | 'dislike';

    @Column("int", { nullable: true })
    post_id: number;

    @ManyToOne(() => Post, (post: Post) => post.likes)
    @JoinColumn({ name: 'post_id' })
    post: Post;
}
