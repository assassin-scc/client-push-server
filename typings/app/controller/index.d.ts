// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportPushPush from '../../../app/controller/push/push';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    push: {
      push: ExportPushPush;
    }
  }
}
