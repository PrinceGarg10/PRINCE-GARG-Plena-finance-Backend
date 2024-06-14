import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Authorized } from '../../decorators/authorized.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiTags("users")
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    // @Authorized()
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Authorized()
    @Get('search')
    async findAll(@Query() query: any) {
        return await this.userService.findAll(query);
    }

    @Authorized()
    @Get()
    async findOne(@Query('id') id: string) {
        return await this.userService.findOne(id);
    }

    @Authorized()
    @Patch()
    async update(@Body() updateUserDto: UpdateUserDto) {
        delete updateUserDto.isBlocked
        return await this.userService.update(updateUserDto);
    }

    @Authorized()
    @Patch('block')
    async blockUser(@Body('userId') userId: string) {
        return await this.userService.update({
            id: userId,
            isBlocked: true
        });
    }

    @Authorized()
    @Patch('unblock')
    async unBlockUser(@Body('userId') userId: string) {
        return await this.userService.update({
            id: userId,
            isBlocked: false
        });
    }

    @Authorized()
    @Delete()
    async remove(@Query('id') id: string) {
        return await this.userService.remove(id);
    }

}
