import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './post';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('int', { nullable: true })
    post_id: number;

    @ManyToOne(() => Post, (post: Post) => post.categ, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'post_id' })
    post: Post;
}
