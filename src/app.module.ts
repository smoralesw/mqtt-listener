import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttService } from './mqtt/mqtt.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: 'credentails.secret',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [MqttService, AppService],
})
export class AppModule {}

