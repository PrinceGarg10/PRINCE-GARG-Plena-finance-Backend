import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { CommonModule, Config } from './common';
import { Service } from './tokens';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        CommonModule,
        MongooseModule.forRootAsync({
            imports: [CommonModule],
            inject: [Service.CONFIG],
            useFactory: (config: Config): MongooseModuleOptions => {
                return config.mongoConfig
            },
        }),
        AuthModule,
        UserModule,
    ],
    providers: [AppService],
    controllers: [AppController]
})
export class ApplicationModule { }
