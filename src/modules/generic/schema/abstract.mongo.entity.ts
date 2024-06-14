import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export abstract class AbstractMongoEntity {

}
