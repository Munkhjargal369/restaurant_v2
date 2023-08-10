import { Controller, Get, Post, Put, Delete, Param , Body, ParseIntPipe} from '@nestjs/common';
import { Image as ImageModel} from '@prisma/client';
import { ImageService } from './image.service';
import { imageDto } from './dto/image.dto';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService){}

    @Post('/:product')
    createImage(@Body() postData: imageDto, @Param('product', ParseIntPipe) productId : number){
        return this.imageService.createImage({...postData ,productId})
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id : number) : Promise<ImageModel>{
        return this.imageService.getById(id)
    }

    @Get()
    getAll(): Promise<ImageModel[] | null> {
        return this.imageService.getImages();
    }

    @Put(':id')
    updateImage(
        @Param('id' , ParseIntPipe) id: number, 
        @Body() data: imageDto
    ) : Promise<ImageModel>{
        return this.imageService.updateImage({...data , id});
    }

    @Delete(':id')
    deleteImage(@Param('id', ParseIntPipe) id: number): Promise<ImageModel>{
        return this.imageService.deleteImage(id);
    }
}