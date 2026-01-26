import {Db, MongoClient} from "mongodb";
import {UserDbType} from "../users/types/main-types/user-db-type";

export const db = {
  client: {} as MongoClient,

  getDbName(): Db {
    return this.client.db()
  },
  async run(url: string) {
    try {
      this.client = new MongoClient(url);
      await this.client.connect();
      await this.getDbName().command({ping: 1})
      console.log("Connected successfully.");
    } catch (error: unknown) {
      console.error("can't connect to MongoDB: ", error);
      await this.client.close()
    }
  },
  async stop() {
    await this.client.close();
    console.log("connect successfully closed");
  },
  async drop() {
    try {
      const collections = await this.getDbName().listCollections().toArray()

      for (const collection of collections) {
        const collectionName = collection.name;
        await this.getDbName().collection(collectionName).deleteMany({})
      }
    } catch (error: unknown) {
      console.error("error drop db", error);
      await this.stop()
    }
  },
  getCollections() {
    return {
      usersCollection: this.getDbName().collection<UserDbType>("users")
    }
  },
}