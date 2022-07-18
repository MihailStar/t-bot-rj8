import { MiddlewareFn, Scenes } from 'telegraf';

const game: MiddlewareFn<Scenes.SceneContext> = (ctx) => {
  ctx.scene.enter('game').catch(console.error);
};

export { game };
