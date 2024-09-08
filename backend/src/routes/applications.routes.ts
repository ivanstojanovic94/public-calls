import express from 'express';
import { ApplicationsController } from '../controllers/applications.controller';



const applicationsRouter = express.Router();

applicationsRouter.route('/saveApplication').post(
    (req,res)=>new ApplicationsController().saveApplication(req,res)
);
applicationsRouter.route('/getDrafts').post(
    (req,res)=>new ApplicationsController().getAllDraftedApplications(req,res)
);
applicationsRouter.route('/deleteDraft').post(
    (req,res)=>new ApplicationsController().deleteDraft(req,res)
);
applicationsRouter.route('/sentApplications').post(
    (req,res)=>new ApplicationsController().getAllApplications(req,res)
);
applicationsRouter.route('/appsOfCall').post(
    (req,res)=>new ApplicationsController().getApplicationsByIdCall(req,res)
);
applicationsRouter.route('/acceptApp').post(
    (req,res)=>new ApplicationsController().acceptApplication(req,res)
);
applicationsRouter.route('/declineApp').post(
    (req,res)=>new ApplicationsController().declineApplication(req,res)
);
applicationsRouter.route('/stopShowingApp').post(
    (req,res)=>new ApplicationsController().stopShowingToUser(req,res)
);
applicationsRouter.route('/numberOfAppsPerCall').get(
    (req,res)=>new ApplicationsController().numberOfAppsPerCall(req,res)
);
applicationsRouter.route('/numberOfAppsPerScienceField').get(
    (req,res)=>new ApplicationsController().numberOfAppsPerScienceField(req,res)
);
applicationsRouter.route('/numberOfAppsPerInstitution').get(
    (req,res)=>new ApplicationsController().numberOfAppsPerInstitution(req,res)
);
export default applicationsRouter;