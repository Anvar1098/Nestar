import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit {
  private logger: Logger = new Logger('SocketEventGateWay');
  private summaryClient: number = 0;

  public afterInit(server: Server) {
    this.logger.log(`Websocket Server Initialized total: ${this.summaryClient}`);
  }

  handleConnection(client: WebSocket, ...args: any[]) {
    this.summaryClient++;
    this.logger.log(`== Client connected total: ${ this.summaryClient } ==`);
  }

  handleDisconnect(client: WebSocket) {
    this.summaryClient--;
    this.logger.log(`== Client connected left total: ${ this.summaryClient } ==`);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
