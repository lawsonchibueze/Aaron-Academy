import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { auth } from '../auth.js';
import { AdminController } from './admin.controller.js';
import { PublicController } from './public.controller.js';

@Module({
  imports: [
    AuthModule.forRoot({
      auth,
      bodyParser: {
        json: { limit: '2mb' },
        urlencoded: { limit: '2mb', extended: true },
      },
    }),
  ],
  controllers: [AppController, AdminController, PublicController],
  providers: [AppService],
})
export class AppModule {}
