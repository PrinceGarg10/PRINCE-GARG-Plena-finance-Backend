import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    surname?: string;

    @ApiProperty()
    dob: Date;

    @ApiProperty()
    isBlocked?: boolean;

    @ApiProperty()
    contact?: string;

    @ApiProperty()
    email?: string;

    @ApiProperty()
    gender?: string;

    @ApiProperty()
    password?: string;

    // @ApiProperty()
    hash?: string;

    @ApiProperty()
    username?: string;
}