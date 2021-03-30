import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user';
import { Comment } from './comment';
import { Category } from './category';
import { Like } from './like';

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;

    @Column()
    title: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    publish_date: string;

    @Column({
        type: 'enum',
        enum: ['active', 'inactive'],
        default: 'inactive',
    })
    status: 'active' | 'inactive';

    @Column()
    content: string;

    @Column({ nullable: true })
    categories: string | null;

    /*------------------------------------------------------*/

    @Column('int', { nullable: true })
    user_id: number;

    @ManyToOne(() => User, (user: User) => user.posts, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    /*------------------------------------------------------*/

    @OneToMany('Comment', (comment: Comment) => comment.post, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    comments: Array<Comment>;

    @OneToMany('Category', (category: Category) => category.post, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    categ: Array<Category>;

    @OneToMany('Like', (like: Like) => like.post, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    likes: Array<Category>;
}
