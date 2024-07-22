import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }


    getUsers() {
        return "Get all users";
    }

    getUser(id: string) {
        return `Get user with id ${id}`;
    }

    registerUser() {
        return "Register a user";
    }

    loginUser() {
        return "Login a user";
    }


}
