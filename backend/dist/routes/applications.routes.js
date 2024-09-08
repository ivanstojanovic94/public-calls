"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applications_controller_1 = require("../controllers/applications.controller");
const applicationsRouter = express_1.default.Router();
applicationsRouter.route('/saveApplication').post((req, res) => new applications_controller_1.ApplicationsController().saveApplication(req, res));
applicationsRouter.route('/getDrafts').post((req, res) => new applications_controller_1.ApplicationsController().getAllDraftedApplications(req, res));
applicationsRouter.route('/deleteDraft').post((req, res) => new applications_controller_1.ApplicationsController().deleteDraft(req, res));
applicationsRouter.route('/sentApplications').post((req, res) => new applications_controller_1.ApplicationsController().getAllApplications(req, res));
applicationsRouter.route('/appsOfCall').post((req, res) => new applications_controller_1.ApplicationsController().getApplicationsByIdCall(req, res));
applicationsRouter.route('/acceptApp').post((req, res) => new applications_controller_1.ApplicationsController().acceptApplication(req, res));
applicationsRouter.route('/declineApp').post((req, res) => new applications_controller_1.ApplicationsController().declineApplication(req, res));
applicationsRouter.route('/stopShowingApp').post((req, res) => new applications_controller_1.ApplicationsController().stopShowingToUser(req, res));
applicationsRouter.route('/numberOfAppsPerCall').get((req, res) => new applications_controller_1.ApplicationsController().numberOfAppsPerCall(req, res));
applicationsRouter.route('/numberOfAppsPerScienceField').get((req, res) => new applications_controller_1.ApplicationsController().numberOfAppsPerScienceField(req, res));
applicationsRouter.route('/numberOfAppsPerInstitution').get((req, res) => new applications_controller_1.ApplicationsController().numberOfAppsPerInstitution(req, res));
exports.default = applicationsRouter;
//# sourceMappingURL=applications.routes.js.map