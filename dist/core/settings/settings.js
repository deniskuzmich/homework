"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SETTINGS = void 0;
exports.SETTINGS = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb+srv://root:root@cluster0.rfbjknn.mongodb.net/?appName=Cluster0',
    DB_NAME: process.env.DB_NAME || 'Blogs-and-Posts',
};
