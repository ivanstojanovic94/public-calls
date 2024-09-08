import express from 'express';
import { UserGeneralController } from '../controllers/user.general.controller';
const userGeneralRouter = express.Router();

userGeneralRouter.route('/login').post(
    (req,res)=>new UserGeneralController().login(req,res)
);

userGeneralRouter.route('/changePassword').post(
    (req,res)=>new UserGeneralController().changePassword(req,res)
);

userGeneralRouter.route('/deactivateAccount').post(
    (req,res)=>new UserGeneralController().deactivateAccount(req,res)
);

userGeneralRouter.route('/register').post(
    (req,res)=>new UserGeneralController().register(req,res)
);

export default userGeneralRouter;