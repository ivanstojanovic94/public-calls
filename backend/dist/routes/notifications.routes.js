"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notifications_controller_1 = require("../controllers/notifications.controller");
const notificationsRouter = express_1.default.Router();
notificationsRouter.route('/pushNotification').post((req, res) => new notifications_controller_1.NotificationsController().pushNotification(req, res));
notificationsRouter.route('/getNotifications').post((req, res) => new notifications_controller_1.NotificationsController().getNotifications(req, res));
notificationsRouter.route('/deleteNotification').post((req, res) => new notifications_controller_1.NotificationsController().deleteNotification(req, res));
notificationsRouter.route('/markAsRead').post((req, res) => new notifications_controller_1.NotificationsController().markAsRead(req, res));
exports.default = notificationsRouter;
//# sourceMappingURL=notifications.routes.js.map