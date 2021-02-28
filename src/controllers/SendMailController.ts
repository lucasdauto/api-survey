import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRespository";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailServices from "../services/SendMailServices";
import { resolve } from 'path';


class SendMail {

    async execute(request: Request, response: Response){
        const  { email, survey_id } = request.body;
        // console.log(survey_id)

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveyUsersRepository = getCustomRepository(SurveyUserRepository);

        const user = await usersRepository.findOne({email});

        if(!user){
            return response.status(400).json({
                error: "User does not exists"
            })
        }

        const survey = await surveysRepository.findOne({id: survey_id});

        if(!survey){
            return response.status(400).json({
                error: "Survey does not exists"
            });
        }

        const surveyUser = surveyUsersRepository.create({
            user_id: user.id,
            survey_id: survey.id,
        });
        
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")
        
        await surveyUsersRepository.save(surveyUser);

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL
        }

        await SendMailServices.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser);
    }
}

export { SendMail };
