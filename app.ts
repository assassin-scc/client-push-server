import { Application, IBoot } from 'egg';
const type = '[app]';

export default class AppBoot implements IBoot {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;

    app.messenger.on('pushMsg', ({ pushType, eventName, signal, socketId }) => {
      const socket = (app.io.of('/') as any).connected[socketId];
      if (!socket) {
        return;
      }
      app.logger.info(`push msg to socketId [${ socketId }]`, signal);
      if (pushType === 'robot' && socket.robot === true) {
        return;
      }
      socket[pushType] = true;
      socket.emit(eventName, signal);
    });
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.

  }

  configDidLoad() {
    // Config, plugin files have loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready.

  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
  }

  async serverDidReady() {
    // Server is listening.
    this.app.logger.info(type, '服务启动成功，监听端口', this.app.config.port);
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}
