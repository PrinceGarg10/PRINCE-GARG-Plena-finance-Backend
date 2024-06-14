import { Module } from '@nestjs/common';
import { configProvider, LoggerService } from './provider';

@Module({
    providers: [
        configProvider,
        LoggerService,
    ],
    exports: [
        configProvider,
        LoggerService,

    ]
})
export class CommonModule { }
