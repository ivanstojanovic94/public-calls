"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationTemplateController = void 0;
const registrationTemplate_1 = __importDefault(require("../models/registrationTemplate"));
class RegistrationTemplateController {
    constructor() {
        this.addNewTemplate = (req, res) => {
            let newTemplate = new registrationTemplate_1.default(req.body);
            newTemplate.id = 1;
            newTemplate.save().then(template => {
                res.json({ 'message': 'ok' });
            }).catch(err => {
                console.log(err);
            });
        };
        this.deleteOldTemplate = (req, res) => {
            registrationTemplate_1.default.deleteOne({ 'id': 1 }, err => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.getTemplate = (req, res) => {
            registrationTemplate_1.default.findOne({ 'id': 1 }, (err, obj) => {
                if (err)
                    console.log(err);
                else {
                    res.json(obj);
                }
                ;
            });
        };
    }
}
exports.RegistrationTemplateController = RegistrationTemplateController;
//# sourceMappingURL=registrationTemplate.controller.js.map