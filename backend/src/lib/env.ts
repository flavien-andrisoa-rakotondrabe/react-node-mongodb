import dotenv from 'dotenv';

dotenv.config();

const dbUri = process.env.DATABASE_URI!;
const backendPort = process.env.BACKEND_PORT!;
const frontendUri = process.env.FRONTEND_URI!;

export { dbUri, backendPort, frontendUri };
