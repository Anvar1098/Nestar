import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';
import * as WebSocket from "ws";
import { AuthService } from '../components/auth/auth.service';
import { Member } from '../libs/dto/member/member';
import * as url from 'url';

interface MessagePayload {   // Clientga data yuborish & qabul qilish uchun bu
  event: string;
  text: string;
  memberData: Member | null;
}

interface InfoPayload {       // Kimdur serverimizga ulansa, yangi ulanganlik malumotini boshqalarga yuboradi
  event: string;
  totalClients: number;       // Asosiy yuboriladigan xabar (yani hamma user/browserlaga yangilangan userlar sonini yuboradi!)
  memberData: Member | null;  // ulangan Member
  action: string;             // joined | left
}

@WebSocketGateway({ transport: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit {
  private logger: Logger = new Logger('SocketEventsGateway');
  private summaryClient: number = 0;
  private clientsAuthMap = new Map<WebSocket, Member>()   // Auth userni infolarini saqlash uchun Object urnida
  private messagesList: MessagePayload[] = [];

  constructor(private authService: AuthService) { }

  @WebSocketServer()   // Serverimizni decorator orqali qulga olmoqdamiz!
  server: Server;

  public afterInit(server: Server) {
    this.logger.verbose(`WebSocket Server Initialized & total: [${this.summaryClient}]`);
  }

  private async retrieveAuth(req: any): Promise<Member | null> {    //how the backend gets the user ID or user info from the incoming WebSocket request
    try {
      const parseUrl = url.parse(req.url, true);    // kirib kelgan url qabul qilinadi
      const { token } = parseUrl.query;
      
      return await this.authService.verifyToken(token as string);   
    } catch (err) {
      return null;
    }
  }

  public async handleConnection(client: WebSocket, req: any) {
    const authMember = await this.retrieveAuth(req);    // Agar auth member bulsa, uni qiymatini qaytarib beradi  
    this.summaryClient++;
    //@ts-ignore
    this.clientsAuthMap.set(client, authMember); // Client serverga ulanganda, uning malumotini client key ostida authMember bilan save qilinadi

    const clientNick: string = authMember?.memberNick ?? 'Guest';
    this.logger.verbose(`Connection [${clientNick}] & total: [${this.summaryClient}]`);

    const infoMsg: InfoPayload = {   // Hamma ulangan clientlarga malumot yuborish uchun
      event: 'info',
      totalClients: this.summaryClient,
      memberData: authMember,   // ulangan client!
      action: 'joined',
    };
    this.emitMessage(infoMsg)   // Yangi ulangan clientsga xabarni yuborish uchun (Bu faqat yangi qushilgan clientlarga xabar yuboradi!)
    client.send(JSON.stringify({ event: 'getMessages', list: this.messagesList }));  // Ulangan clientga xabar yuborish (yani chatga kirgan client)
  }

  public handleDisconnect(client: WebSocket) {
    const authMember = this.clientsAuthMap.get(client)
    this.summaryClient--;
    this.clientsAuthMap.delete(client);   // Kim disconnect bulgani haqida

    const clientNick: string = authMember?.memberNick ?? 'Guest';
    this.logger.verbose(`Disconnected [${clientNick}] & total  [${this.summaryClient}]`);

    const infoMsg: InfoPayload = {
      event: 'info',
      totalClients: this.summaryClient,
      memberData: authMember ?? null,
      action: 'left',
    };
    this.broadcastMessage(client, infoMsg);   // Uzilgan member haqida boshqa userlaga data yuborish call qilindi!
  }

  @SubscribeMessage('message')      // 
  public async handleMessage(client: WebSocket, payload: string): Promise<void> {
    const authMember = this.clientsAuthMap.get(client)    // Aynan kim murojat qiganini bilishimiz mumkin
    const newMessage: MessagePayload = { event: 'message', text: payload, memberData: authMember ?? null };

    const clientNick: string = authMember?.memberNick ?? 'Guest';
    this.logger.verbose(`NEW MESSAGE [${clientNick}] : ${payload}`);

    this.messagesList.push(newMessage);     // Yani oxirgi yangi smslarni qushib quyadi, bu oxirgi yangi ulangan client uchun 
    if (this.messagesList.length > 5) this.messagesList.splice(0, this.messagesList.length -5);

    this.emitMessage(newMessage)      // Xabar yuborish xamma userlaga
  }

  private broadcastMessage(sender: WebSocket, message: InfoPayload) {   // Bu disconnect bulgan clientdan boshqa qolgan userlaga datani yuborish uchun!
    this.server.clients.forEach((client) => {
      if (client !== sender && client.readyState === WebSocket.OPEN) {    // Client tekshirilmoqda! 
        client.send(JSON.stringify(message));
      }
    });
  }

  private emitMessage(message: InfoPayload | MessagePayload) {   // Ulangan hamma clientlarga malumot yetkazish uchun! 
    this.server.clients.forEach((client) => {   // forEach => ulangan hamma client ruyhatini olib beradi!
      if (client.readyState === WebSocket.OPEN) {    // Buyerda Client ni tekshirish mantigi, xabar yuborish uchun!
        client.send(JSON.stringify(message));       // Albatta JSON formatga ugiriladi message
      }
    })
  }
}


/*
 MESSAGE TARGET:
    1. Client (only client)
    2. Broadcast (except clients )
    3. Emit (all  clients)
 */