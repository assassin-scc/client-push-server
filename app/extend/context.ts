import { Context } from 'egg';

const RESULT = Symbol('Context#result');

export default {
  get result () {
    if (!this[RESULT]) {
      this[RESULT] = { success: false};
    }
    return this[RESULT];
  },

  set result (res) {
    this[RESULT] = res;
  },

  sendResult(this: Context): void {
    this.result.message = this.result.success ? this.result.message || '200 ok!' :
    this.result.message || 'unknow error';
    this.body = this.result;
  }

}