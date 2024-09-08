"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const user_general_routes_1 = __importDefault(require("./routes/user.general.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const publicCalls_routes_1 = __importDefault(require("./routes/publicCalls.routes"));
const applications_routes_1 = __importDefault(require("./routes/applications.routes"));
const notifications_routes_1 = __importDefault(require("./routes/notifications.routes"));
const registrationTemplate_routes_1 = __importDefault(require("./routes/registrationTemplate.routes"));
const file_routes_1 = __importDefault(require("./routes/file.routes"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join('uploads')));
const mongoURI = 'mongodb://localhost:27017/publicallsdb';
mongoose_1.default.connect('mongodb://localhost:27017/publicallsdb');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('mongo ok');
});
// Create storage engine
const router = express_1.default.Router();
router.use('/userGeneral', user_general_routes_1.default);
router.use('/admin', admin_routes_1.default);
router.use('/publicCalls', publicCalls_routes_1.default);
router.use('/applications', applications_routes_1.default);
router.use('/notifications', notifications_routes_1.default);
router.use('/registrationTemplate', registrationTemplate_routes_1.default);
router.use('/files', file_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map