"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
class FilesController {
    constructor() {
        this.uploadFile = (req, res) => {
            res.json({ file: req.file });
        };
    }
}
exports.FilesController = FilesController;
//# sourceMappingURL=files.controller.js.map