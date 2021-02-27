import { Router } from 'express';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();

//instancias
const userController =  new UserController();
const surveysController =  new SurveysController();

//USERS
router.post('/users', userController.create);

//SURVEYS
router.post('/surveys', surveysController.create);
router.get('/surveys', surveysController.show);


export { router };
