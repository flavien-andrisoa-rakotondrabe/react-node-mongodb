import dotenv from 'dotenv';

dotenv.config();

const backendPort = process.env.BACKEND_PORT as string;
const frontendUri = process.env.FRONTEND_URI as string;

export { backendPort, frontendUri };
