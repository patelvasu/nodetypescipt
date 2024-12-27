import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(__dirname, '../../.env') })

export const TEST = process.env.NODE_ENV === 'test';
export const PORT = process.env.PORT