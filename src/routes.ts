import { Router } from 'express';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';
import { SendMail } from './controllers/SendMailController';

const router = Router();

//instancias
const userController =  new UserController();
const surveysController =  new SurveysController();
const SendMailController = new SendMail();

//USERS
router.post('/users', userController.create);

//SURVEYS
router.post('/surveys', surveysController.create);
router.get('/surveys', surveysController.show);

//Survey Users
router.post('/sendMail', SendMailController.execute);


export { router };
