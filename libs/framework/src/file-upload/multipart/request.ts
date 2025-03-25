import { type TUploadOptions } from '#framework/file-upload/multipart/options.type';
import { type TFastifyMultipartRequest, type TMultipartIterator } from '#framework/file-upload/multipart/request.type';
import { BadRequestException } from '@nestjs/common';
import { type HttpArgumentsHost } from '@nestjs/common/interfaces';
import { type FastifyRequest } from 'fastify';

export const getMultipartRequest = (ctx: HttpArgumentsHost) => {
  const req = ctx.getRequest<TFastifyMultipartRequest>();

  if (req.isMultipart() === false) {
    throw new BadRequestException('Not a multipart request');
  }

  return req;
};

export const getParts = (req: FastifyRequest, options: TUploadOptions) => {
  return req.parts(options) as TMultipartIterator;
};
