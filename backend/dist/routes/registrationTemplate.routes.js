"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registrationTemplate_controller_1 = require("../controllers/registrationTemplate.controller");
const registrationTemplateRouter = express_1.default.Router();
registrationTemplateRouter.route('/getTemplate').get((req, res) => new registrationTemplate_controller_1.RegistrationTemplateController().getTemplate(req, res));
registrationTemplateRouter.route('/deleteOldTemplate').delete((req, res) => new registrationTemplate_controller_1.RegistrationTemplateController().deleteOldTemplate(req, res));
registrationTemplateRouter.route('/addNewTemplate').post((req, res) => new registrationTemplate_controller_1.RegistrationTemplateController().addNewTemplate(req, res));
exports.default = registrationTemplateRouter;
//# sourceMappingURL=registrationTemplate.routes.js.map