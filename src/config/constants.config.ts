import "dotenv/config"

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
export const CATALOG_URI = process.env.CATALOG_URI
export const MONGO_DB = process.env.MONGO_DB || 'test';
export const JWT_SECRET = process.env
