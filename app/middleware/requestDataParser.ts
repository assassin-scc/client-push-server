import { Context } from 'egg';

export default {
  async pushMsg(ctx: Context, next: (err?: any) => Promise<any>) {
    let data: any = {};
    if (ctx.method === 'GET') {
      data = ctx.query;
    } else if (ctx.method === 'POST') {
      data = ctx.request.body;
    } else {
      ctx.logger.warn(`无效的请求`);
      return;
    }
    try {
      ctx.request.body.json = typeof data.json === 'string' ? JSON.parse(data.json) : data.json;
      await next();
    } catch (error) {
      await next(error);
    }
  }
}