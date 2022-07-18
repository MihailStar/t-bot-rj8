import { Telegraf, Scenes } from 'telegraf';
import { IsAdmin } from '../middleware/isAdmin';
import { configuration } from '../common/configuration';

const bot = new Telegraf<Scenes.SceneContext & IsAdmin>(
  configuration.BOT_TOKEN
);

export { bot };
