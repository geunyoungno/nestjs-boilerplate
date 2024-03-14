import { AppModule } from '#app.module';
import { MailerService } from '#common/mailer/mailer.service';
import { UserModule } from '#user/user.module';
import { Test, TestingModule } from '@nestjs/testing';
import * as uuid from 'uuid';

describe('MailerService', () => {
  let service: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule],
      providers: [MailerService],
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  it('send mail', async () => {
    const userUuid = uuid.v4()
    const sended = service.sendSignUp({
      userUuid,
    });

    expect(sended).toBeTruthy();
  });
});
