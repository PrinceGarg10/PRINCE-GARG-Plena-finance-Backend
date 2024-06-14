import { MongooseModuleOptions } from "@nestjs/mongoose";

export interface Config {

    readonly API_PORT: number;

    readonly API_PREFIX: string;

    readonly DB_URI: string;

    readonly JWT_SECRET: string;

    readonly mongoConfig: MongooseModuleOptions
}
