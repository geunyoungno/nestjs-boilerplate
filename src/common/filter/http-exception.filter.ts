import { ResJsendDto } from '#common/http/dto/res-jsend.dto';
import { getReply, getReq } from '#common/http/httpHelper';
import { LoggerService } from '#common/logger/logger.service';
import { Catch, HttpException, type ArgumentsHost, type ExceptionFilter } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const req = getReq(host);
    const reply = getReply(host);
    const status = exception.getStatus();
    const replyData = {
      // TODO: code 가 정의 되면 변경해야 됩니다.
      code: `${exception.name}`,
      message: exception.message,
    };

    this.logger.httpErr({
      req,
      reply,
      replyData,
      err: exception,
    });

    reply.status(status).send(new ResJsendDto(replyData));
  }
}
