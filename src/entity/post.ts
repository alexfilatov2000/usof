import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    JoinTable,
    ManyToMany,
} from 'typeorm';
import { User } from './user';
import { Comment } from './comment';
import { Category } from './category';
import { Like } from './like';

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

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

    /*------------------------------------------------------*/

    @Column('int', { nullable: true })
    user_id: number;

    @ManyToOne(() => User, (user: User) => user.posts, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    /*------------------------------------------------------*/
    //many to many custom
    // @OneToMany(() => PostToCategory, postToCategory => postToCategory.post)
    // postToCategories: PostToCategory[];
    @ManyToMany(() => Category, (category) => category.posts, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinTable({
        name: 'posts_categories',
        joinColumn: {
            name: 'post_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'category_id',
            referencedColumnName: 'id',
        },
    })
    categories: Category[];

    /*------------------------------------------------------*/

    @OneToMany('Comment', (comment: Comment) => comment.post, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    comments: Array<Comment>;

    @OneToMany('Like', (like: Like) => like.post, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    likes: Array<Category>;
}
