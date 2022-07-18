import { Context, MiddlewareFn } from 'telegraf';
import { configuration } from '../common/configuration';

export type IsAdmin = { isAdmin: boolean };
interface ContextWithIsAdmin extends Context, IsAdmin {}

const isAdmin: MiddlewareFn<ContextWithIsAdmin> = (ctx, next) => {
  ctx.isAdmin = ctx.from?.id === configuration.BOT_ADMIN_ID;
  next().catch(console.error);
};

export { isAdmin };
