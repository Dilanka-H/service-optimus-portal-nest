import { Injectable } from '@nestjs/common';

@Injectable()
export class WebsocketService {
  processMessage(data: any): any {
    return { text: `Processed: ${data.text}` };
  }
}
