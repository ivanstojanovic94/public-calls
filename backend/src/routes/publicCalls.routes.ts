import express from 'express';
import { PublicCallsController } from '../controllers/publicCalls.controller';

const publicCallsRouter = express.Router();

publicCallsRouter.route('/getPublicCallbyId').post(
    (req,res)=>new PublicCallsController().getPublicCallById(req,res)

);

publicCallsRouter.route('/getQuestions').post(
    (req,res)=>new PublicCallsController().getQuestionsOfCall(req,res)

);

publicCallsRouter.route('/getAllPublicCalls').post(
    (req,res)=>new PublicCallsController().getAllPublicCalls(req,res)
);

publicCallsRouter.route('/retrievePublicCalls').get(
    (req,res)=>new PublicCallsController().retrievePublicCalls(req,res)
);



export default publicCallsRouter;