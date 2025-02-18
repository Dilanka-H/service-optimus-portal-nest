import { Injectable } from '@nestjs/common';
import { Document, FilterQuery, Model } from 'mongoose';
import { MongoUpdateResponse } from 'src/common/interfaces/database_domain.interface';
import { assignUpdateResponse } from './common';

@Injectable()
export class MongoService {
    constructor(){}

    async createDocument<T extends Document>(model: Model<T>, data: Partial<T>): Promise<T> {
        const createdRecord = new model(data);
        return createdRecord.save();
    }

    async findDocuments<T extends Document>(
        model: Model<T>, 
        condition: FilterQuery<T>,
        projection?: string
      ): Promise<T[]> {
        return model.find(condition, projection).exec();
    }

    async updateEncryptedDocuments<T extends Document>(
        model: Model<T>,
        condition: FilterQuery<T>, 
        setParams: Record<string, any>
      ): Promise<MongoUpdateResponse> {
        const documents: T[] = await this.findDocuments(model, condition);
        const result: MongoUpdateResponse = assignUpdateResponse(documents)
        
        if (result.matchedCount > 0) {
            const updatePromises = documents.map(async (document) => {
                for (const [key, value] of Object.entries(setParams)) {
                  document.$set(key, value);
                }
                await document.save();
                return document;
              });
            
              const updatedPromises = await Promise.all(updatePromises);
              result.modifiedCount = updatedPromises.length
        }
        
        return result
    } 
    
    async updateManyDocuments<T extends Document>(
        model: Model<T>,
        condition: FilterQuery<T>, 
        setParams: Record<string, any>
    ): Promise<MongoUpdateResponse> {
        return model.updateMany(condition, {$set: setParams}).lean().exec()
    }
}
