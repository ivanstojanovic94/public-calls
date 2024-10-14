import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import userGeneralRouter from './routes/user.general.routes';
import adminRouter from './routes/admin.routes';
import publicCallsRouter from './routes/publicCalls.routes';
import applicationsRouter from './routes/applications.routes';
import notificationsRouter from './routes/notifications.routes';
import registrationTemplateRouter from './routes/registrationTemplate.routes';
import fileRouter from './routes/file.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join('uploads')));

const mongoURI='mongodb://localhost:27017/publicallsdb';
mongoose.connect('mongodb://localhost:27017/publicallsdb');
const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('mongo ok');
});

// Create storage engine
const router = express.Router();
router.use('/userGeneral', userGeneralRouter);
router.use('/admin', adminRouter);
router.use('/publicCalls', publicCallsRouter);
router.use('/applications', applicationsRouter);
router.use('/notifications',notificationsRouter);
router.use('/registrationTemplate', registrationTemplateRouter);
router.use('/files',fileRouter);

app.use('/',router);
app.listen(4000, () => console.log(`Express server running on port 4000`));