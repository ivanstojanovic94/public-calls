"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const publicCall_1 = __importDefault(require("../models/publicCall"));
class AdminController {
    constructor() {
        this.openPublicCall = (req, res) => {
            publicCall_1.default.find({}, (err, calls) => {
                if (err)
                    console.log(err);
                else {
                    let id = calls[calls.length - 1].id + 1;
                    let pCall = new publicCall_1.default(req.body);
                    pCall.id = id;
                    pCall.save().then(pcall => {
                        res.json({ "message": "added call" });
                    }).catch(err => {
                        res.json(err);
                    });
                }
            });
        };
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map