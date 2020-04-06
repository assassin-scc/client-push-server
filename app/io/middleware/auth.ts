import { Context } from 'egg';
import * as crypto from 'crypto';
import * as ip from 'ip';


export default () => {
  return async (ctx: Context, next: (err?: any) => Promise<any>) => {
    const { app, socket } = ctx;

    try {
      const cip = crypto.createCipher('des', 'wecuTerkdYefnqim');
      const key = cip.update(`${ip.address()}: ${app.config.port}`, 'binary', 'hex') + cip.final('hex');
      // 权限校验通过
      socket.emit('socket', {key, socketId: socket.id});
      ctx.logger.info(`连接了一个客户端。。。。。 socketId [${socket.id}]`);
      await next();
      ctx.logger.info(`断开了一个客户端。。。。。 socketId [${socket.id}]`);
    } catch (error) {
      await next(error);
    }
  }
}