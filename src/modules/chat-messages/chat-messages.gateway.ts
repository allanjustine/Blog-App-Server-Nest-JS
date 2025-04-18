import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatMessagesGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('sendPublicMessage')
  handleSendMessage(client: Socket, @MessageBody() payload: any): void {
    this.server.emit('sentPublicMessage', payload.toRefresh);
    this.server.emit('publicSenderId', payload.publicSenderId);
  }
}
