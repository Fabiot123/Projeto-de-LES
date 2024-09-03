import { prisma } from "src/lib/prisma";

export class ClientDAO{
    public async get(){
        return prisma.client.findMany()
    }
}