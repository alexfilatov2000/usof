import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './post';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany('Post', (post: Post) => post.category, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    posts: Array<Post>;
}
