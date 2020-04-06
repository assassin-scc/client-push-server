import { Controller } from 'egg';
import * as crypto from 'crypto';

declare module 'egg' {
  interface CustomController {
    receive: ReceiveController,
  }
}

export default class ReceiveController extends Controller {
  
  async token () {
    const { ctx } = this;
    const [sid] = ctx.args;
    const tokenTime = Date.now();
    const sip = crypto.createCipher('des', 'wecuTerkdYefnqim');
    const token = sip.update(`${sid}_${tokenTime}`, 'binary', 'hex') + sip.final('hex');
    ctx.socket.emit('token', { token, tokenTime });
  }



  async disconnect () {
    const { ctx } = this;
    ctx.logger.info(`i am here disconnect........`);
  }
}