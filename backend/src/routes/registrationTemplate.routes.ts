import express from 'express';
import { RegistrationTemplateController } from '../controllers/registrationTemplate.controller';

const registrationTemplateRouter = express.Router();

registrationTemplateRouter.route('/getTemplate').get(
    (req,res)=>new RegistrationTemplateController().getTemplate(req,res)
);

registrationTemplateRouter.route('/deleteOldTemplate').delete(
    (req,res)=> new RegistrationTemplateController().deleteOldTemplate(req,res)
);

registrationTemplateRouter.route('/addNewTemplate').post(
    (req,res)=> new RegistrationTemplateController().addNewTemplate(req,res)
);

export default registrationTemplateRouter;