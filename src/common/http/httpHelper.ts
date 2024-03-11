import { type ArgumentsHost, type ExecutionContext } from '@nestjs/common';
import { type FastifyReply, type FastifyRequest } from 'fastify';

type TContext = ArgumentsHost | ExecutionContext;

const getHttp = (context: TContext) => context.switchToHttp();

export const getReq = <TFastifyRequest extends FastifyRequest>(context: TContext) =>
  getHttp(context).getRequest<TFastifyRequest>();

export const getReply = (context: TContext) => getHttp(context).getResponse<FastifyReply>();
