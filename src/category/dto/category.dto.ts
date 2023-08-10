import {IsString, IsNotEmpty} from 'class-validator';

export class createCategoryDto{
    @IsString()
    @IsNotEmpty()
    name : string;
}

export class updateCategoryDto{
    @IsString()
    @IsNotEmpty()
    name : string;
}