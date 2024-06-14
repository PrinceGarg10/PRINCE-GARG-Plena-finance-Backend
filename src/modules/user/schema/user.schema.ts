import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Gender } from "../../common/constants/gender";
import { HashService } from "../../../utils/hashService";
import { UtilsService } from "../../../utils/utils.service";


@Schema({ timestamps: true })
export class UserEntity {
    @Prop({ required: true })
    name: string;

    @Prop()
    surname: string;

    @Prop({ required: true })
    dob: Date;

    @Prop({
        default: false
    })
    isBlocked: boolean;

    @Prop({
        index: true,
        required: true,
        unique: true
    })
    contact: string;

    @Prop()
    email: string;

    @Prop({ enum: Object.values(Gender) })
    gender: string;

    @Prop({ unique: true })
    username: string;

    @Prop(
        {
            select: false
        }
    )
    password: string;

    @Prop(
        {
            select: false
        }
    )
    hash: string;

}

async function preSavedHook(next: any) {
    if (!this.isModified('password')) return next();
    const password = await HashService.generateHash(this.password)
    this.set('password', password);
    this.set("hash", HashService.base64Encode(this.password));
    next();
}

export const UserDatabaseName = 'user';
export const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.pre<UserDocument>('save', preSavedHook);
UserSchema.post('save', UtilsService.mongooseError)


export type UserDocument = UserEntity & Document;