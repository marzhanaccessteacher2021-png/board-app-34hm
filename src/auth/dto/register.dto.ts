import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterRequest{
    @IsEmail({}, {message: "Invalid email address"})
    @IsNotEmpty({message: "Email should not be empty"})
    @IsString({message: "Email must be a string"})
    email: string;

    @IsNotEmpty({message: "Name should not be empty"})
    @IsString({message: "Name must be a string"})
    @MinLength(6, {message: "Name must be at least 6 characters long"})
    @MaxLength(50, {message: "Name must be at most 50 characters long"})
    name: string;

    @IsNotEmpty({message: "Password should not be empty"})
    @IsString({message: "Password must be a string"})
    @MinLength(6, {message: "Password must be at least 6 characters long"})
    @MaxLength(50, {message: "Password must be at most 50 characters long"})
    password: string;
}