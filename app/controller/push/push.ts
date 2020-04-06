import { Controller } from 'egg';
import * as _ from 'lodash';

export default class PushController extends Controller{

  async push () {
    const { ctx } = this;
    const data = ctx.request.body.json;
    const result = await ctx.service.push.push(data);
    _.assign(ctx.result, result);
    ctx.sendResult();
  }
}