// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportRequestDataParser from '../../../app/middleware/requestDataParser';

declare module 'egg' {
  interface IMiddleware {
    requestDataParser: typeof ExportRequestDataParser;
  }
}
