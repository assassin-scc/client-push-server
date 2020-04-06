import { Service } from 'egg';

export default class PushService extends Service {

  async push(data: any): Promise<any> {
    const { ctx, app } = this;
    const result: any = {
      success: false,
    }
    try {
      ctx.logger.info(`data ${JSON.stringify(data)}`);
      const { type, socketId } = data;
      if (!socketId) {
        ctx.logger.warn(`not found socketId ${socketId}`);
        return;
      }
      let signal: any;
      if (type) {
        switch (type) {
          case 'investigate': 
          signal = 200;
          break;
        case 'screenShareStart':
          signal = {sig: 103, type};
          break;
        default:
          break;
        }
      }
      const pushMsg = {
        signal,
        socketId,
        pushType: type,
        eventName: 'getMsg',
      }
      app.messenger.sendToApp('pushMsg', pushMsg);
      ctx.logger.info(`send to app, pushMsg: ${ JSON.stringify(pushMsg) }`);
      result.success = true;
    } catch (error) {
      ctx.logger.warn('push message error', error, JSON.stringify(data));
      result.message = 'push message error';
    } finally {
      return result;
    }
  }
}