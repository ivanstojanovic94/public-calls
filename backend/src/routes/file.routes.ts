import express from 'express';
import storage from '../helper/storage';
import { FilesController } from '../controllers/files.controller';

const fileRouter = express.Router();

fileRouter.post('/upload',storage.array('file'),
(req,res)=>new FilesController().uploadFile(req,res))

export default fileRouter;