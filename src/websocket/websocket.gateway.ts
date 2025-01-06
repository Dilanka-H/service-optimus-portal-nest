import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { WebsocketService } from './websocket.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class WebsocketGateway {
  constructor(private readonly websocketService: WebsocketService) {}
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    // Ensure server is defined before emitting
    if (!this.server) {
      console.error('Server is undefined');
      return;
    }
    const response = this.websocketService.processMessage(data);
    client.emit('message', { text: `Hello, client ${client.id}! ${response.text}` });
  }
}
