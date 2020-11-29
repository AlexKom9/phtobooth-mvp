import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { CampaignService } from './campaign/campaign.service';
import { FacebookApiService } from './facebook-api/facebook-api.service';

@WebSocketGateway({
  transport: ['websocket'],
  namespace: '/',
  serveClient: false,
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly facebookApiService: FacebookApiService,
  ) {}
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('takePicture')
  async handleTakePictureMessage(client: Socket, payload: string) {
    this.logger.log(`Client send event takePicture: ${client.id}, ${payload}`);
    this.server.emit('takePicture', payload);
  }

  @SubscribeMessage('uploadPhoto')
  async handleUploadPhoto(client: Socket, payload: any) {
    this.logger.log(`Client send event uploadPhoto: ${client.id}`);
    const { role, campaignId } = client.handshake.query;

    try {
      const photo = await this.campaignService.addClientPhoto(
        campaignId,
        Buffer.from(
          payload.imgData.replace(/^data:image\/\w+;base64,/, ''),
          'base64',
        ),
        `client-photo-campaign-${campaignId}`,
      );

      console.log(photo);



      // todo: post a link
      // const response = await this.facebookApiService.makePost({
      //   accountId: payload.fbAccountId,
      //   caption: 'Lalka lalka lalka',
      //   dataUrl: `http://d301pdcxn9df5o.cloudfront.net/${photo.key}`,
      //   accountAccessToken: payload.fbAccountAccessToken,
      // });

      // console.log('response ->', response);
    } catch (e) {
      console.warn(e);
    }
  }

  @SubscribeMessage('guestConnected')
  handleGuestConnectedMessage(client: Socket, payload: string): void {
    this.logger.log(
      `Client send event guestConnected: ${client.id}, ${payload}`,
    );
    this.server.emit('guestConnected', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const { role, campaignId } = client.handshake.query;

    if (role === 'host') {
      try {
        const guestLink = await this.campaignService.campaignGuestLink(
          campaignId,
        );
        this.logger.log(
          `Host connected: ${client.id}; guestLink: ${guestLink}`,
        );
        this.server.emit('hostConnected', { guestLink });
      } catch (e) {
        console.error(e);
      }
    } else {
      this.logger.log(`Client connected: ${client.id}`);
    }

    // todo: disconet not accessablee clients
    // setTimeout(() => {
    //   client.disconnect(true);
    // }, 3000);
  }
}
