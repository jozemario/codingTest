// post.model.ts

import { Entity, Column,PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'posts' })
export default class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 256 })
  title: string;
  @Column("text")
  body: string;
}