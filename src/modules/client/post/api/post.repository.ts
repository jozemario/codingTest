// NPM modules
import { EntityRepository, Repository } from 'typeorm';

// File modules
import Post from './post.entity';

@EntityRepository(Post)
export default class PostRepository extends Repository<Post> {}
