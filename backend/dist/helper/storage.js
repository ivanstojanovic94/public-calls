"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const diskStorage = multer_1.default.diskStorage({
    destination: 'D:/publicCallsApp/backend/uploads',
    filename: (req, file, cb) => {
        const mimeType = file.mimetype.split('/');
        const fileType = mimeType[1];
        const fileName = file.originalname;
        //console.log(fileName);
        cb(null, fileName);
    },
});
const storage = multer_1.default({ storage: diskStorage });
exports.default = storage;
//# sourceMappingURL=storage.js.map