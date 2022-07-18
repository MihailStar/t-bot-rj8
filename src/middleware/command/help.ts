import { MiddlewareFn, Context } from 'telegraf';

const help: MiddlewareFn<Context> = (ctx) => {
  ctx.telegram
    .getMyCommands()
    .then((commands) => {
      const text = commands.reduce(
        (accumulator, command) =>
          `${accumulator}${command.description}: /${command.command}\n`,
        ''
      );

      ctx.reply(text).catch(console.error);
    })
    .catch(console.error);
};

export { help };
