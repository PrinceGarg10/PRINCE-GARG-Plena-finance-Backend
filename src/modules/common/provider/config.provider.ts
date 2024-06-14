import * as Joi from 'joi';
import * as _ from 'lodash';

import { Service } from '../../tokens';
import { Config } from '../model';
import * as dotenv from 'dotenv' 

export const configProvider = {

    provide: Service.CONFIG,
    useFactory: (): Config => {
        dotenv.config()
        const env = process.env;
        const validationSchema = Joi.object().unknown().keys({
            API_PORT: Joi.string().required(),
            API_PREFIX: Joi.string().required(),
            DB_URI: Joi.string().required(),
            JWT_SECRET: Joi.string().required(),
            JWT_ISSUER: Joi.string().required(),


        });

        const result = validationSchema.validate(env);

        if (result.error) {
            throw new Error('Configuration not valid: ' + result.error.message);
        }

        return {
            API_PORT: _.toNumber(env.API_PORT),
            API_PREFIX: `${env.API_PREFIX}`,
            DB_URI: `${env.DB_URI}`,
            JWT_SECRET: `${env.JWT_SECRET}`,
            mongoConfig: {
                uri: env.DB_URI,
                maxPoolSize: 10,
                socketTimeoutMS: 10000,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: env.DB_NAME
            },

        };
    }
};