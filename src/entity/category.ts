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

    // @OneToMany(() => PostToCategory, postToCategory => postToCategory.category)
    // postToCategories: PostToCategory[];

    @ManyToMany(() => Post, (post) => post.categories, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    posts: Post[];
}
