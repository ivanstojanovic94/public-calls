"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const publicCalls_controller_1 = require("../controllers/publicCalls.controller");
const publicCallsRouter = express_1.default.Router();
publicCallsRouter.route('/getPublicCallbyId').post((req, res) => new publicCalls_controller_1.PublicCallsController().getPublicCallById(req, res));
publicCallsRouter.route('/getQuestions').post((req, res) => new publicCalls_controller_1.PublicCallsController().getQuestionsOfCall(req, res));
publicCallsRouter.route('/getAllPublicCalls').post((req, res) => new publicCalls_controller_1.PublicCallsController().getAllPublicCalls(req, res));
publicCallsRouter.route('/retrievePublicCalls').get((req, res) => new publicCalls_controller_1.PublicCallsController().retrievePublicCalls(req, res));
exports.default = publicCallsRouter;
//# sourceMappingURL=publicCalls.routes.js.map