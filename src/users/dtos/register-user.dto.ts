import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    password: string;


    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsOptional()
    auth_strategy: string;
}