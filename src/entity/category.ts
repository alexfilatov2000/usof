import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
// import {PostToCategory} from "./postToCategory";
import { Post } from './post';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

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
