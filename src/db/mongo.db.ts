import {Collection, Db, MongoClient} from 'mongodb';
import {SETTINGS} from "../core/settings/settings";
// import {Blog} from "../blogs/types/main-types/blog-db.type";
// import {Post} from "../posts/types/main-types/posts-db.type";
import {CommentDbType} from "../comments/types/main-types/comment-db.type";
import {UserDbType} from "../users/types/main-types/user-db-type";
import {SessionType} from "../devices/types/session.type";
import {RequestLogType} from "../devices/types/request-count.type";
import mongoose from "mongoose";


export async function runDbMongoose() {
  try {
    await mongoose.connect(SETTINGS.MONGO_URL, {dbName: SETTINGS.DB_NAME})
    console.log("MongoDB Connected")
  } catch (err) {
    console.error('connection to db error' + err);
    await mongoose.disconnect();
  }
}

export async function stopDbMongoose() {
  await mongoose.disconnect();
}


// const BLOGS_COLLECTION_NAME = 'blogs';
// const POSTS_COLLECTION_NAME = 'posts';
const USERS_COLLECTION_NAME = 'users';
const COMMENTS_COLLECTION_NAME = 'comments';
const SESSIONS_COLLECTION_NAME = 'sessions';
const REQUEST_LOG_COLLECTION_NAME = 'requestCount';





export let client: MongoClient;

// export let blogsCollection: Collection<Blog>;
// export let postsCollection: Collection<Post>;
export let usersCollection: Collection<UserDbType>;
export let commentsCollection: Collection<CommentDbType>;
export let sessionsCollection: Collection<SessionType>
export let requestLogCollection: Collection<RequestLogType>


export async function runDB(url: string): Promise<void> {
  client = new MongoClient(url);
  const db: Db = client.db(SETTINGS.DB_NAME);


  // blogsCollection = db.collection<Blog>(BLOGS_COLLECTION_NAME);
  // postsCollection = db.collection<Post>(POSTS_COLLECTION_NAME);
  usersCollection = db.collection<UserDbType>(USERS_COLLECTION_NAME);
  commentsCollection = db.collection<CommentDbType>(COMMENTS_COLLECTION_NAME);
  sessionsCollection = db.collection(SESSIONS_COLLECTION_NAME);
  requestLogCollection = db.collection(REQUEST_LOG_COLLECTION_NAME)

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