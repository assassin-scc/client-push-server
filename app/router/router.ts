import { Application } from 'egg';
import requestDataParser from '../middleware/requestDataParser';

export default (app: Application) => {
  const { controller, router, io } = app;

  router.get('/', controller.home.index);
  router.post('/push', requestDataParser.pushMsg, controller.push.push.push);

  const socketNameSpace = io.of('/');
  socketNameSpace.route('scctoken', io.controller.receive.token);
  socketNameSpace.route('disconnect', io.controller.receive.disconnect);
};
