import express from 'express';
import { NotificationsController } from '../controllers/notifications.controller';

const notificationsRouter=express.Router();

notificationsRouter.route('/pushNotification').post(
    (req,res)=>new NotificationsController().pushNotification(req,res)
);

notificationsRouter.route('/getNotifications').post(
    (req,res)=>new NotificationsController().getNotifications(req,res)
);

notificationsRouter.route('/deleteNotification').post(
    (req,res)=>new NotificationsController().deleteNotification(req,res)
);

notificationsRouter.route('/markAsRead').post(
    (req,res)=>new NotificationsController().markAsRead(req,res)
);

export default notificationsRouter;