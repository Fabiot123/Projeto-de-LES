/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma.service';
import { Genero, StatusCliente, TipoTel, TipoCartao, TipoBandeira, TipoResidencia, TipoLograd } from '@prisma/client';
import { ClientSchema } from './client.zod';

@Injectable()
export class ClientsService {
    constructor(private prisma: PrismaService) {}

    async createClient(data: ClientSchema) {
      return this.prisma.client.create({
        data: {
            cli_name: data.name,
            cli_cpf: data.cpf,
            cli_gen: data.gender as Genero,
            cli_tel: {
                create: {
                    tel_tipo: data.tel.tipo as TipoTel,
                    tel_ddd: data.tel.ddd,
                    tel_num: data.tel.numero,
                },
            },
            cli_dt_nasc: new Date(data.dt_nascimento),
            cli_email: data.email,
            cli_senha: data.senha,
            cli_status: StatusCliente.Ativo,
            cli_end: {
                create: data.endereco.map((end) => ({
                    end_resi: end.resi as TipoResidencia,
                    end_tlogra: end.tlogra as TipoLograd,
                    end_logra: end.logra,
                    end_num: end.num,
                    end_bairro: end.bairro,
                    end_cep: end.cep,
                    end_cidade: end.cidade,
                    end_estado: end.estado,
                    end_pais: end.pais,
                    end_cob: end.tipos.includes("Cobrança"),
                    end_ent: end.tipos.includes("Entrega"),
                    end_res: end.tipos.includes("Residência")
                })),
            },
            cli_crt: {
                create: data.cartao.map((crt) => ({
                    crt_num: crt.num,
                    crt_nome: crt.nome,
                    crt_band: crt.bandeira as TipoBandeira,
                    crt_cod_seg: crt.cvc,
                    crt_validade: crt.validade,
                    crt_tipo: crt.tipo as TipoCartao,
                })),
            },
        },
    });
    }
    async getList(){
        return this.prisma.client.findMany({
            include:{
                cli_tel: true
            }
        });
    }
    async getByID(id: string){
        return this.prisma.client.findFirst({
            where: {
                cli_id: id
            },
            include: {
                cli_tel: true,
                cli_crt: true,
                cli_end: true
            }
        })
    }
    async update(id: string, data: ClientSchema){
        const addresses = await Promise.all(data.endereco.map((end)=>{
            if(end.id){
            return this.prisma.endereco.update({   
            where:{ 
                    end_id: end.id 
                }, 
            data: {
                end_resi: end.resi as TipoResidencia,
                end_tlogra: end.tlogra as TipoLograd,
                end_logra: end.logra,
                end_num: end.num,
                end_bairro: end.bairro,
                end_cep: end.cep,
                end_cidade: end.cidade,
                end_estado: end.estado,
                end_pais: end.pais,
                end_cob: end.tipos.includes("Cobrança"),
                end_ent: end.tipos.includes("Entrega"),
                end_res: end.tipos.includes("Residência")
                }
            })}
            return this.prisma.endereco.create({
                data: {
                    end_resi: end.resi as TipoResidencia,
                    end_tlogra: end.tlogra as TipoLograd,
                    end_logra: end.logra,
                    end_num: end.num,
                    end_bairro: end.bairro,
                    end_cep: end.cep,
                    end_cidade: end.cidade,
                    end_estado: end.estado,
                    end_pais: end.pais,
                    end_cob: end.tipos.includes("Cobrança"),
                    end_ent: end.tipos.includes("Entrega"),
                    end_res: end.tipos.includes("Residência"),
                    end_cli_id: id,
                }
            })
            }
        )
    )

    const cards = await Promise.all(data.cartao.map((crt)=>{
        if(crt.id){
        return this.prisma.cartao.update({   
        where:{ 
               crt_id : crt.id 
            }, 
        data: {
            crt_num: crt.num,
            crt_nome: crt.nome,
            crt_band: crt.bandeira as TipoBandeira,
            crt_cod_seg: crt.cvc,
            crt_validade: crt.validade,
            crt_tipo: crt.tipo as TipoCartao,
            }
        })}
        return this.prisma.cartao.create({
            data: {
                crt_num: crt.num,
                crt_nome: crt.nome,
                crt_band: crt.bandeira as TipoBandeira,
                crt_cod_seg: crt.cvc,
                crt_validade: crt.validade,
                crt_tipo: crt.tipo as TipoCartao,
                crt_cli_id: id,
            }
        })
        }
    )
)

        return this.prisma.client.update({
            where: {
                cli_id: id
            },
            data: {
                cli_name: data.name,
                cli_cpf: data.cpf,
                cli_gen: data.gender as Genero,
                cli_tel: {
                    update: {
                        tel_tipo: data.tel.tipo as TipoTel,
                        tel_ddd: data.tel.ddd,
                        tel_num: data.tel.numero,
                    },
                },
                cli_dt_nasc: new Date(data.dt_nascimento),
                cli_email: data.email,
                cli_senha: data.senha,
                cli_status: StatusCliente.Ativo,
                cli_end: {
                    connect: addresses.map((end) => ({
                        end_id: end.end_id
                    })),
                },
                cli_crt: {
                    connect: cards.map((crt) => ({
                        crt_id: crt.crt_id
                    })),
                },
            },
        })
    }

    async delete(id: string){
        console.log(id);
        await this.prisma.client.delete({
            where: {
                cli_id: id
            }
        })
    }
}    