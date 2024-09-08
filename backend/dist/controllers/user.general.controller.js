"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGeneralController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserGeneralController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            //let type=req.body.type;
            user_1.default.findOne({ 'username': username, 'password': password, 'activeAccount': 1 }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.changePassword = (req, res) => {
            let username = req.body.username;
            let newPass = req.body.newPass;
            user_1.default.collection.updateOne({ 'username': username }, { $set: { password: newPass } });
            res.json({ message: 'ok' });
        };
        this.deactivateAccount = (req, res) => {
            let username = req.body.username;
            user_1.default.collection.updateOne({ 'username': username }, { $set: { activeAccount: 0 } });
            res.json({ message: 'ok' });
        };
        this.register = (req, res) => {
            user_1.default.find({ 'username': req.body.username }, (err, users) => {
                if (users.length != 0) {
                    res.json({ 'message': 'usernameExists' });
                }
                else {
                    user_1.default.find({}, (err, users) => {
                        if (err)
                            console.log(err);
                        else {
                            let id = users[users.length - 1].id + 1;
                            let app = new user_1.default(req.body);
                            app.id = id;
                            app.save().then(app => {
                                res.json({ "message": "ok" });
                            }).catch(err => {
                                console.log(err);
                            });
                        }
                    });
                }
            });
        };
    }
}
exports.UserGeneralController = UserGeneralController;
//# sourceMappingURL=user.general.controller.js.map