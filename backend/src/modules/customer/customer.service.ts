import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Customer } from '@prisma/client';
import {
  ErrorResponse,
  formatError,
} from '../..//utils/error/error-response-util';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Customer[] | ErrorResponse> {
    try {
      const customers = await this.prisma.customer.findMany();
      return customers;
    } catch (error) {
      throw formatError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Ocorreu um erro ao buscar os clientes.',
        error,
      );
    }
  }

  async findOne(id: number): Promise<Customer | ErrorResponse> {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: { id },
      });

      if (!customer) {
        throw formatError(
          HttpStatus.NOT_FOUND,
          'Cliente não encontrado.',
          `Cliente com id ${id} não encontrado.`,
        );
      }

      return customer;
    } catch (error) {
      throw formatError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Ocorreu um erro ao buscar o cliente.',
        error,
      );
    }
  }
}
