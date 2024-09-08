import express from 'express';
import { AdminController } from '../controllers/admin.controller';
const adminRouter = express.Router();

adminRouter.route('/openCall').post(
    (req,res)=>new AdminController().openPublicCall(req,res)
);


export default adminRouter;