import { Telegraf } from 'telegraf';
import { configuration } from '../common/configuration';

const logger = Telegraf.optional(
  () => configuration.NODE_ENV === 'development',
  Telegraf.log()
);

export { logger };
