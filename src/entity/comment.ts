import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './post';

@Entity('comment')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    publish_date: string;

    @Column()
    content: string;

    @Column('int', { nullable: true })
    post_id: number;

    @ManyToOne(() => Post, (post: Post) => post.comments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'post_id' })
    post: Post;
}
