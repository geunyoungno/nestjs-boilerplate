import { JsendDto } from '#common/dto/res-jsend.dto';
import { getReply } from '#common/http/httpHelper';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // const _req = getReq(host);
    const reply = getReply(host);

    const status = exception.getStatus();

    reply.status(status).send(
      new JsendDto({
        code: `${exception.name}`,
        message: exception.message,
      }),
    );
  }
}
