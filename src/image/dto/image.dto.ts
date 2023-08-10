import {IsString, IsNotEmpty} from 'class-validator';
export class imageDto{
    @IsString()
    @IsNotEmpty()
    url : string;
}