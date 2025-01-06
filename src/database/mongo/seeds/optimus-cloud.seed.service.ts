import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OptimusJobLists } from '../schema/optimusjoblists.shema';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(OptimusJobLists.name) private optimusJobListsModel: Model<OptimusJobLists>,
  ) {}

  async onModuleInit() {
    // Clear the collection on startup
    await this.clearDatabase();

    // Seed new data after clearing
    await this.seedDatabase();
  }

  private async clearDatabase() {
    await this.optimusJobListsModel.deleteMany({});
  }

  private async seedDatabase() {
    const jobs = [
      {
        "jobStatus": "Active", // Unencrypted value to be encrypted
        "jobId": "JOB001",
        "jobName": "Test Job 1",
        "orderDate": "2024-10-08",
        "jobType": "Standard",
        "createBy": "admin",
        "updateBy": "admin",
        "TIMESTAMP": new Date("2024-10-08T12:35:07.811+0000"),
        "forwarderName": "Forwarder A",
        "jobDate": "2024-10-09",
        "itemsSize": 1,
        "itemsList": [
          {
            "serialNo": "12345",
            "imsi": "123456789012345",
            "nuNotifyFlag": "Y",
            "orderStatus": "Pending",
            "prepTransactionNo": "TX123",
          }
        ],
      },
      {
        "jobStatus": "Init-repair", // Unencrypted value to be encrypted
        "jobId": "JOB002",
        "jobName": "Test Job 2",
        "orderDate": "2024-10-08",
        "jobType": "Standard",
        "createBy": "admin",
        "updateBy": "admin",
        "TIMESTAMP": new Date("2024-11-08T12:35:07.811+0000"),
        "forwarderName": "Forwarder A",
        "jobDate": "2024-10-09",
        "itemsSize": 1,
        "itemsList": [
          {
            "serialNo": "12345",
            "imsi": "123456789012345",
            "nuNotifyFlag": "Y",
            "orderStatus": "Pending",
            "prepTransactionNo": "TX123",
          }
        ],
      }
    ];
    // Save the job data
    await this.optimusJobListsModel.create(jobs); 
  }
}
