import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5557;
export const mongoDBURL = process.env.MONGODB_URI || "mongodb://localhost:27017/agroshield";
export const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
export const JWT_EXPIRE = process.env.JWT_EXPIRE || "1h";
