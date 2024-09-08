"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storage_1 = __importDefault(require("../helper/storage"));
const files_controller_1 = require("../controllers/files.controller");
const fileRouter = express_1.default.Router();
fileRouter.post('/upload', storage_1.default.array('file'), (req, res) => new files_controller_1.FilesController().uploadFile(req, res));
exports.default = fileRouter;
//# sourceMappingURL=file.routes.js.map