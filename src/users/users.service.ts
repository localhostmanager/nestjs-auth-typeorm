import { CreateUserPostDto } from './dtos/create-user-post.dto';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Profile } from './entities/profile.entity';
import { SetupUserProfileDto } from './dtos/setup-user-profile.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post>) { }


    async getUsers(): Promise<User[]> {
        const users: User[] = await this.userRepository.find({
            relations: {
                profile: true,
                posts: true,
            }
        });

        if (users.length === 0) throw new NotFoundException("No users found");

        return users;
    }

    async getUser(id: number): Promise<User> {
        const user: User = await this.userRepository.findOne({ where: { id } });

        if (!user) throw new NotFoundException("User not found");

        return user;
    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
        // Check if user already exists
        const findUser = await this.userRepository.findOne({ where: { username: registerUserDto.username } });
        if (findUser) {
            throw new BadRequestException("User could not be created");
        }

        // Create user
        const user = this.userRepository.create(registerUserDto);

        if (!user) {
            throw new Error("User not created");
        }

        return await this.userRepository.save(user);
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {

        const user = await this.userRepository.findOne({ where: { id: id } });

        if (!user) throw new NotFoundException("User not found");

        const updatedUser = await this.userRepository.update({ id }, updateUserDto);

        user.username = updateUserDto.username;
        user.password = updateUserDto.password;

        return user;

    }


    async deleteUser(id: number): Promise<User> {

        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) throw new NotFoundException("User not found");

        await this.userRepository.delete({ id });

        return user;

    }

    async loginUser(loginUserDto: LoginUserDto): Promise<User> {

        const user = await this.userRepository.findOne({ where: { username: loginUserDto.username, password: loginUserDto.password } });

        if (!user) throw new UnauthorizedException("Invalid email or Password");

        return user;

    }


    async setupUserProfile(id: number, setupUserProfileDto: SetupUserProfileDto): Promise<User> {

        const user = await this.userRepository.findOne({ where: { id: id } });

        if (!user) throw new NotFoundException("User not found");

        let profile: Profile;
        let savedProfile: Profile;

        if (setupUserProfileDto.profile_id) {
            profile = await this.profileRepository.findOne({ where: { id: +setupUserProfileDto.profile_id } });
            if (profile) {
                const test = await this.profileRepository.update({ id: +setupUserProfileDto.profile_id }, setupUserProfileDto);
                console.log(test);
                // Update profile
                // this.profileRepository.update({ id: +setupUserProfileDto.profile_id }, setupUserProfileDto);
                savedProfile = profile;
            }
        } else {
            profile = this.profileRepository.create(setupUserProfileDto);
            savedProfile = await this.profileRepository.save(profile);
        }

        user.profile = savedProfile;

        await this.userRepository.save(user);

        // await this.userRepository.update({ id }, { profile: savedProfile });

        return user;
    }

    async createPost(id: number, createUserPostDto: CreateUserPostDto): Promise<Post> {

        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) throw new NotFoundException("User not found");

        const post = this.postRepository.create(createUserPostDto);

        post.user = user;

        await this.postRepository.save(post);

        return post;

    }


    async getUserPosts(id: number): Promise<User> {

        const user = await this.userRepository.findOne({ where: { id }, relations: { posts: true } });

        if (!user) throw new NotFoundException("User not found");

        return user;
    }

}
