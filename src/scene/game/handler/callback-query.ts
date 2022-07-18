import { MiddlewareFn, NarrowedContext, Scenes, Markup } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { Game } from '../game';
import { User as UserModel } from '../../../model/user';

const Command = {
  REENTER: 'REENTER',
  LEAVE: 'LEAVE',
} as const;

const games: { [id: number]: Game } = [];

async function saveGame(tgId: number, game: Game): Promise<void> {
  const [user] = await UserModel.findOrCreate({
    where: { tgId },
  });

  if (game.isWinner) {
    await user.increment('right');
  } else {
    await user.increment('notRight');
  }
}

const callbackQuery: MiddlewareFn<
  NarrowedContext<Scenes.SceneContext, Update.CallbackQueryUpdate>
> = async (ctx, next) => {
  if (!('data' in ctx.callbackQuery)) {
    next().catch(console.error);
    return;
  }

  if (ctx.callbackQuery.data === Command.REENTER) {
    ctx.scene
      .reenter()
      ?.then(() => {
        ctx.answerCbQuery().catch(console.error);
      })
      .catch(console.error);
    return;
  }

  if (ctx.callbackQuery.data === Command.LEAVE) {
    ctx.scene
      .leave()
      .then(() => {
        const text = `Игра ${Game.NAME} завершена`;

        ctx.reply(text).catch(console.error);
      })
      .then(() => {
        ctx.answerCbQuery().catch(console.error);
      })
      .catch(console.error);
    return;
  }

  const { id } = ctx.update.callback_query.from;
  games[id] = new Game(Number(ctx.callbackQuery.data));

  const text = `Выбрано: ${games[id].answer}
Загадано: ${games[id].secret}
Вердикт: ${games[id].isWinner ? 'выиграл' : 'проиграл'}
Играть в ${Game.NAME} еще раз?`;
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('Да', Command.REENTER),
    Markup.button.callback('Нет', Command.LEAVE),
  ]);

  ctx
    .reply(text, keyboard)
    .then(() => {
      saveGame(id, games[id]).catch((reason) => {
        ctx.reply('БД все... Попробуйте позже').catch(console.error);
        console.error(reason);
      });
    })
    .then(() => {
      ctx.answerCbQuery().catch(console.error);
    })
    .catch(console.error);
};

export { callbackQuery };
