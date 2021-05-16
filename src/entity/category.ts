import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, Index} from 'typeorm';
// import {PostToCategory} from "./postToCategory";
import { Post } from './post';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @ManyToMany(() => Post, (post) => post.categories, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    posts: Post[];
}
