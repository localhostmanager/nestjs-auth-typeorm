import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/constants/swagger-tags.constant';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { SetupUserProfileDto } from './dtos/setup-user-profile.dto';
import { CreateUserPostDto } from './dtos/create-user-post.dto';

@ApiTags(SwaggerTags.USERS)
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {

    }


    @Get()
    async getUsers(): Promise<User[]> {
        return await this.usersService.getUsers();
    }


    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.getUser(id);
    }


    @Post('register')
    async registerUser(@Body(ValidationPipe) registerUserDto: RegisterUserDto): Promise<User> {
        return await this.usersService.registerUser(registerUserDto);
    }

    @Post('login')
    async loginUser(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
        return await this.usersService.loginUser(loginUserDto);
    }


    @Put(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return await this.usersService.updateUser(id, updateUserDto);
    }


    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.deleteUser(id);
    }


    @Post(':id/profile')
    async setupUserProfile(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) setupUserProfileDto: SetupUserProfileDto) {
        return await this.usersService.setupUserProfile(id, setupUserProfileDto);
    }


    @Post(':id/post')
    async createPost(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) createUserPostDto: CreateUserPostDto) {
        return await this.usersService.createPost(id, createUserPostDto);
    }

    @Get(':id/posts')
    async getUserPosts(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.getUserPosts(id);
    }
}
