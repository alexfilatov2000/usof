import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    login: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    profile_picture: string;

    @Column({ nullable: true })
    rating: number;

    @Column({
        type: 'enum',
        enum: ['admin', 'user'],
        default: 'user',
    })
    role: 'admin' | 'user';
}
