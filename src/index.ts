import { session, Scenes } from 'telegraf';
import { bot } from './connection/bot';
import { game as gameScene } from './scene/game';
import { logger as loggerMiddleware } from './middleware/logger';
import { isAdmin as isAdminMiddleware } from './middleware/isAdmin';
import { Game } from './scene/game/game';
import { start as startCommandHandler } from './middleware/command/start';
import { help as helpCommandHandler } from './middleware/command/help';
import { ping as pingCommandHandler } from './middleware/command/ping';
import { game as gameCommandHandler } from './middleware/command/game';
import { info as infoCommandHandler } from './middleware/command/info';
import { db } from './connection/db';

bot.use(session());
bot.use(new Scenes.Stage([gameScene]).middleware());

bot.use(loggerMiddleware);
bot.use(isAdminMiddleware);

bot.telegram
  .setMyCommands([
    { command: 'start', description: 'Запустить бота' },
    { command: 'help', description: 'Получить помощь' },
    { command: 'ping', description: 'Пингануть сервер' },
    { command: 'game', description: `Играть в ${Game.NAME}` },
    { command: 'info', description: 'Получить информацию' },
  ])
  .catch(console.error);

bot.command('start', startCommandHandler);
bot.command('help', helpCommandHandler);
bot.command('ping', pingCommandHandler);
bot.command('game', gameCommandHandler);
bot.command('info', infoCommandHandler);

Promise.all([bot.launch(), db.sync()])
  .then(() => {
    console.log('Бот запущен');
  })
  .catch((reason) => {
    if (reason instanceof Error) {
      throw reason;
    }

    throw new Error(String(reason));
  });

process.once('SIGINT', () => {
  bot.stop('SIGINT');
  db.close().catch(console.error);
});
process.once('SIGTERM', () => {
  bot.stop('SIGTERM');
  db.close().catch(console.error);
});
