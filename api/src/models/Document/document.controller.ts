import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Validation } from 'src/utils/Validation';
import { createSchema, paramSchema, TParamSchema } from './document.schema';
import { DocumentService } from './document.service';
import { TDocumentCreate } from './types';

@Controller('documents')
export class DocumentController {
  constructor(private readonly service: DocumentService) {}

  @Get(':id')
  async single(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, paramSchema, 'params');

      const queries = request.params as TParamSchema;

      const result = await this.service.single({
        id: queries.id,
        user_id: request.user_id,
      });

      return response.json(result);
    } catch (err) {
      return response.status(err.statusCode).json(err);
    }
  }

  @Get()
  async show(@Req() request: Request, @Res() response: Response) {
    try {
      const result = await this.service.show(request.user_id);

      return response.json(result);
    } catch (err) {
      return response.status(err.statusCode).json(err);
    }
  }

  @Post()
  async create(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, createSchema, 'body');

      const data = request.body;

      const result = await this.service.create(data, request.user_id);

      return response.json(result);
    } catch (err) {
      return response.status(err.statusCode).json(err);
    }
  }

  @Put(':id')
  async update(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, createSchema, 'body');
      Validation.validate(request, paramSchema, 'params');

      const data = request.body as TDocumentCreate;
      const params = request.params as TParamSchema;

      const result = await this.service.update(data, {
        id: params.id,
        user_id: request.user_id,
      });

      return response.json(result);
    } catch (err) {
      return response.status(err.statusCode).json(err);
    }
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, paramSchema, 'params');

      const params = request.params as TParamSchema;

      const result = await this.service.delete({
        id: params.id,
        user_id: request.user_id,
      });

      return response.json(result);
    } catch (err) {
      return response.status(err.statusCode).json(err);
    }
  }
}
