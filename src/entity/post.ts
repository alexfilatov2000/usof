import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;

    @Column()
    title: string;

    @Column()
    publish_date: string;

    @Column({
        type: 'enum',
        enum: ['active', 'inactive'],
        default: 'inactive',
    })
    status: 'active' | 'inactive';

    @Column()
    content: string;

    @Column()
    categories: string;
}
