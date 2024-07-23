import { OmitType, PartialType } from "@nestjs/swagger";
import { RegisterUserDto } from "./register-user.dto";

export class UpdateUserDto extends OmitType(RegisterUserDto, ['email'] as const) { }