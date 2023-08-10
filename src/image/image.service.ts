import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Image as ImageModel} from '@prisma/client';

interface imageParam {
    url : string;
    productId : number;
}

interface updateImageParam {
    url : string;
    productId? :number;
    id? :number
}

@Injectable()
export class ImageService {

    constructor(private prisma: PrismaService){}

    async createImage(data: imageParam): Promise<ImageModel>{
        try{
            return this.prisma.image.create({data});
        }catch(error){
            throw new Error('failed');
        }
    }

    async getByProduct(productId: string): Promise<ImageModel[]>{
        return this.prisma.image.findMany({
            where: {
                product: {id: Number(productId)}
            }
        })
    }

    async getImages() : Promise<ImageModel[] | null> {
        try{
            return this.prisma.image.findMany();
            
        }catch(error){
            throw new Error('failed');
        }
    }

    async getById (id : number) : Promise<ImageModel> {
        try{
            return this.prisma.image.findUnique({where : {id}})
        }catch(error){
            throw new Error('falied');
        }
    }

    async updateImage(params: updateImageParam): Promise<ImageModel> {
        try{
            

            return this.prisma.image.update({
                where : {id : params.id},
                data : {
                    url : params.url
                },
                
            })
        }catch(error){
            throw new Error('failed');
        }
    }

    async deleteImage(id : number): Promise<ImageModel>{
        try{
            return this.prisma.image.delete({where: {id}});   
        }catch(error){
            throw new Error('failed');
        }
    }
}
