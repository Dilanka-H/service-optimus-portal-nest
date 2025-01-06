import { Injectable } from '@nestjs/common';

@Injectable()
export class WebsocketService {
  processMessage(data: any): any {
    // Business logic here
    return { text: `Processed: ${data.text}` };
  }
}
