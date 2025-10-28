import { Collection, Db, MongoClient } from 'mongodb';
import {SETTINGS} from "../core/settings/settings";
import {Blog} from "../core/types/blogs-types";
import {Post} from "../core/types/posts-types";


const BLOGS_COLLECTION_NAME = 'blogs';
const POSTS_COLLECTION_NAME = 'posts';

export let client: MongoClient;
export let blogsCollection: Collection<Blog>;
export let postsCollection: Collection<Post>;


export async function runDB(url: string): Promise<void> {
  client = new MongoClient(url);
  const db: Db = client.db(SETTINGS.DB_NAME);


  blogsCollection = db.collection<Blog>(BLOGS_COLLECTION_NAME);
  postsCollection = db.collection<Post>(POSTS_COLLECTION_NAME);

  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('Connected to the database');
  } catch (e) {
    await client.close();
    throw new Error(`Database not connected: ${e}`);
  }
}


export async function stopDb() {
  if (!client) {
    throw new Error(`No active client`);
  }
  await client.close();
}