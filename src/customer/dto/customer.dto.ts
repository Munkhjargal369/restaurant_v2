import {IsString, IsNotEmpty,IsEmail, IsOptional, Matches} from 'class-validator';
export class createCustomerDto{
    @IsNotEmpty()
    @IsEmail()
    email : string;
    
    @Matches(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {message : 'phone must be a valid'})
    @IsNotEmpty()
    phone_number: number;

    @IsString()
    @IsNotEmpty()
    name: string;
}

export class updateCustomerDto{
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email : string;
    
    @Matches(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {message : 'phone must be a valid'})
    @IsNotEmpty()
    @IsOptional()
    phone_number: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;
}