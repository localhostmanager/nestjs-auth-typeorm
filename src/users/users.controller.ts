import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {


    @Get()
    getUsers() { }


    @Get(':id')
    getUser() { }


    @Post('register')
    registerUser() { }

    @Post('login')
    loginUser() { }



}
