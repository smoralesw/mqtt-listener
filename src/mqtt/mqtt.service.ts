import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService {
  private client: mqtt.Client;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    const options = {
      username: this.configService.get('USERNAME'),
      password: this.configService.get('PASSWORD'),
      port: this.configService.get('PORT'),
    };
    const url = 'mqtt://' + this.configService.get('HOST');
    this.client = mqtt.connect(url, options);
    this.client.on('connect', () => {
      console.log('Connected to MQTT broker:', url);
      this.client.subscribe('events/chile', (err) => {
        if (err) {
          console.log('Error subscribing to topic:', err);
        } else {
          console.log('Subscribed to topic!');
        }
      });
    });
    this.client.on('message', (topic, message) => {
      console.log('Received message:', message.toString());

      const data = JSON.parse(message.toString());
      const url = 'http://localhost:3000/events/create';

      this.httpService.post(url, data).toPromise()
        .then((res) => {
          console.log('Response from API:', res.data);
        })
        .catch((err) => {
          console.log('Error posting to API:', err);
        });
    });
  }
}
