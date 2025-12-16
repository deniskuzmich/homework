"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongodb_1 = require("mongodb");
exports.db = {
    client: {},
    getDbName() {
        return this.client.db();
    },
    run(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.client = new mongodb_1.MongoClient(url);
                yield this.client.connect();
                yield this.getDbName().command({ ping: 1 });
                console.log("Connected successfully.");
            }
            catch (error) {
                console.error("can't connect to MongoDB: ", error);
                yield this.client.close();
            }
        });
    },
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.close();
            console.log("connect successfully closed");
        });
    },
    drop() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collections = yield this.getDbName().listCollections().toArray();
                for (const collection of collections) {
                    const collectionName = collection.name;
                    yield this.getDbName().collection(collectionName).deleteMany({});
                }
            }
            catch (error) {
                console.error("error drop db", error);
                yield this.stop();
            }
        });
    },
    getCollections() {
        return {
            usersCollection: this.getDbName().collection("users")
        };
    },
};
