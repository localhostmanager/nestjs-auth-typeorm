import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class SetupUserProfileDto {
    @ApiProperty()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    age: number;

    @ApiProperty()
    @IsNotEmpty()
    dob: Date;

    @ApiProperty()
    @IsOptional()
    profile_id: string;
}