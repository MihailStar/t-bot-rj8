import { MiddlewareFn, NarrowedContext, Scenes } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { Game } from '../game';

const message: MiddlewareFn<
  NarrowedContext<Scenes.SceneContext, Update.MessageUpdate>
> = (ctx) => {
  ctx.scene
    .leave()
    .then(() => {
      const text = `Игра ${Game.NAME} завершена`;

      ctx.reply(text).catch(console.error);
    })
    .catch(console.error);
};

export { message };
