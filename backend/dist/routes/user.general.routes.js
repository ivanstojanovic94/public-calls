"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_general_controller_1 = require("../controllers/user.general.controller");
const userGeneralRouter = express_1.default.Router();
userGeneralRouter.route('/login').post((req, res) => new user_general_controller_1.UserGeneralController().login(req, res));
userGeneralRouter.route('/changePassword').post((req, res) => new user_general_controller_1.UserGeneralController().changePassword(req, res));
userGeneralRouter.route('/deactivateAccount').post((req, res) => new user_general_controller_1.UserGeneralController().deactivateAccount(req, res));
userGeneralRouter.route('/register').post((req, res) => new user_general_controller_1.UserGeneralController().register(req, res));
exports.default = userGeneralRouter;
//# sourceMappingURL=user.general.routes.js.map