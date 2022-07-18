import { MiddlewareFn, Scenes, Markup } from 'telegraf';
import { Game } from '../game';

const enter: MiddlewareFn<Scenes.SceneContext> = (ctx) => {
  const text = `Игра ${Game.NAME}`;
  const keyboard = Markup.inlineKeyboard([
    [
      Markup.button.callback('1', '1'),
      Markup.button.callback('2', '2'),
      Markup.button.callback('3', '3'),
    ],
    [
      Markup.button.callback('4', '4'),
      Markup.button.callback('5', '5'),
      Markup.button.callback('6', '6'),
    ],
    [
      Markup.button.callback('7', '7'),
      Markup.button.callback('8', '8'),
      Markup.button.callback('9', '9'),
    ],
    [Markup.button.callback('0', '0')],
  ]);

  ctx.reply(text, keyboard).catch(console.error);
};

export { enter };
