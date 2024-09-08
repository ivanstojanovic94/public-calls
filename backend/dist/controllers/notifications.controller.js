"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
class NotificationsController {
    constructor() {
        this.pushNotification = (req, res) => {
            Notification_1.default.find({}, (err, notifs) => {
                if (err)
                    console.log(err);
                else {
                    let id = notifs[notifs.length - 1].id + 1;
                    let notification = new Notification_1.default(req.body);
                    notification.id = id;
                    notification.save().then(app => {
                        res.json({ 'message': 'ok' });
                    }).catch(err => {
                        console.log(err);
                    });
                }
            });
        };
        this.getNotifications = (req, res) => {
            let username = req.body.username;
            Notification_1.default.find({ user: username }, (err, notifs) => {
                if (err)
                    console.log(err);
                else {
                    res.json(notifs);
                }
            });
        };
        this.deleteNotification = (req, res) => {
            let id = req.body.id;
            Notification_1.default.deleteOne({ id: id }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "ok" });
            });
        };
        this.markAsRead = (req, res) => {
            let id = req.body.id;
            Notification_1.default.collection.updateOne({ 'id': id }, { $set: { read: 1 } });
            res.json({ message: 'ok' });
        };
    }
}
exports.NotificationsController = NotificationsController;
//# sourceMappingURL=notifications.controller.js.map