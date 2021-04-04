// import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
// import { Post } from './post';
// import {Category} from "./category";
//
// @Entity('postToCategory')
// export class PostToCategory {
//     @PrimaryGeneratedColumn()
//     id: number;
//
//     @Column({type: 'int'})
//     post_id: number;
//
//     @Column({type: 'int'})
//     category_id: number;
//
//     @ManyToOne(() => Post, post => post.postToCategories)
//     @JoinColumn({name: 'post_id'})
//     post: Post;
//
//     @ManyToOne(() => Category, category => category.postToCategories)
//     @JoinColumn({name: 'category_id'})
//     category: Category;
// }
