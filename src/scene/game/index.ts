import { Scenes } from 'telegraf';
import { enter as enterHandler } from './handler/enter';
import { callbackQuery as callbackQueryHandler } from './handler/callback-query';
import { message as messageHandler } from './handler/message';

const game = new Scenes.BaseScene<Scenes.SceneContext>('game');
game.enter(enterHandler);
// TODO: переписать на game.action
game.on('callback_query', callbackQueryHandler);
game.on('message', messageHandler);

export { game };
