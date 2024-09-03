/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ClientsService } from './client.service';
import { clientschema } from './client.zod';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Post()
    async createClient(@Body() body: any) {
        const valid=clientschema.safeParse(body);
        if(!valid.success){
            throw valid.error;
        }
        return this.clientsService.createClient(valid.data);
    }

    @Get()
    async list(){
        return this.clientsService.getList();
    }

    @Get(':id')
    async idcomp(@Param() params: any){
        return this.clientsService.getByID(params.id);
    }

    @Put(':id')
    async upd(@Param() params: any, @Body() body: any){
        const valid=clientschema.safeParse(body);
        if(!valid.success){
            throw valid.error;
        }
        return this.clientsService.update(params.id, valid.data);
    }

    @Delete(':id')
    async del(@Param() params: any){
        return this.clientsService.delete(params.id);
    }
}
