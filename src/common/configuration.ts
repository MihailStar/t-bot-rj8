import dotenv from 'dotenv';
import { ExitCode } from './exit-code';

dotenv.config();

const { NODE_ENV, BOT_TOKEN, BOT_ADMIN_ID, DB_URL } = process.env;

if (BOT_TOKEN === undefined) {
  process.exitCode = ExitCode.INVALID_ARGUMENT;
  throw new Error('No environment variable process.env.BOT_TOKEN');
}

if (BOT_ADMIN_ID === undefined) {
  process.exitCode = ExitCode.INVALID_ARGUMENT;
  throw new Error('No environment variable process.env.BOT_ADMIN_ID');
}

if (DB_URL === undefined) {
  process.exitCode = ExitCode.INVALID_ARGUMENT;
  throw new Error('No environment variable process.env.DB_URL');
}

// TODO: добавить поле isDevelopment
const configuration = {
  NODE_ENV: NODE_ENV ?? 'development',
  BOT_TOKEN,
  BOT_ADMIN_ID: Number(BOT_ADMIN_ID),
  DB_URL,
} as const;

export { configuration };
