import { MiddlewareFn, NarrowedContext, Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { IsAdmin } from '../isAdmin';
import { User as UserModel } from '../../model/user';
import { Game } from '../../scene/game/game';

const info: MiddlewareFn<
  NarrowedContext<Context & IsAdmin, Update.MessageUpdate>
> = (ctx) => {
  UserModel.findOrCreate({
    where: { tgId: ctx.update.message.from.id },
  })
    .then(([user]) => {
      const text = `Статистика игры ${Game.NAME}
Роль: ${ctx.isAdmin ? 'администратор' : 'пользователь'}
Выиграл: ${user.right}
Проиграл: ${user.notRight}
Всего: ${user.right + user.notRight}
`;

      ctx.reply(text).catch(console.error);
    })
    .catch((reason) => {
      ctx.reply('БД все... Попробуйте позже').catch(console.error);
      console.error(reason);
    });
};

export { info };
