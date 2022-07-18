import { MiddlewareFn, Context } from 'telegraf';

const ping: MiddlewareFn<Context> = (ctx) => {
  const text = 'Понг';

  ctx.reply(text).catch(console.error);
};

export { ping };
