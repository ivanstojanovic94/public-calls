import express, { json } from 'express';
import Notification from '../models/notification';

export class NotificationsController {

    pushNotification = (req: express.Request, res: express.Response) => {
        Notification.find({}, (err, notifs) => {
            if (err) console.log(err);
            else {
                let id = notifs[notifs.length - 1].id + 1;

                let notification = new Notification(req.body);
                notification.id = id;
                notification.save().then(app => {
                    res.json({ 'message': 'ok' });
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    }

    getNotifications = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        Notification.find({ user: username }, (err, notifs) => {
            if (err) console.log(err);
            else {
                res.json(notifs);
            }
        })
    }

    deleteNotification = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        Notification.deleteOne({ id: id }, (err) => {
            if (err) console.log(err);
            else res.json({ 'message': "ok" })
        });
    }

    markAsRead = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        Notification.collection.updateOne({ 'id': id }, { $set: { read: 1 } });
        res.json({ message: 'ok' });
    }
}