import { HttpStatus, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { events } from '@eco/config';
import { UsersService } from '../users/users.service';
import { WsGuard } from '../auth/wsGuard';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4000',
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  wsGuard: WsGuard;

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {
    this.wsGuard = new WsGuard(this.jwtService, this.usersService);
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization.split(' ')[1];
    const valid = await this.wsGuard.isTokenValid(token);
    if (!valid) {
      client.emit(events.sent, { status: HttpStatus.UNAUTHORIZED, token });
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    const token = client.handshake.headers.authorization.split(' ')[1];
    const valid = await this.wsGuard.isTokenValid(token);
    if (!valid) {
      client.emit(events.sent, { status: HttpStatus.UNAUTHORIZED, token });
    }
  }

  @UseGuards(WsGuard)
  @SubscribeMessage(events.message)
  handleMessage(@MessageBody() data: unknown) {
    this.server.emit(events.sent, data);
  }
}
