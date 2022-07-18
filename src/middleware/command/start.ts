import { MiddlewareFn, Context } from 'telegraf';

const start: MiddlewareFn<Context> = (ctx) => {
  // prettier-ignore
  const name = 'MihailStar\'s бот';
  const about = 'Учебный бот (t-bot-rj8)';
  const text = `${name}\n${about}`;

  ctx.reply(text).catch(console.error);
};

export { start };
