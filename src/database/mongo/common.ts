import { Document } from 'mongoose';
import { MongoUpdateResponse } from 'src/common/interfaces/database_domain.interface';

export function assignUpdateResponse(document: Document[]): MongoUpdateResponse {
    const result: MongoUpdateResponse = {
        acknowledged: true,
        matchedCount: 0,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null
    }
    if (document && document.length > 0) {
        result.acknowledged = true
        result.matchedCount = document.length
        result.modifiedCount = 0
        result.upsertedCount = 0
        result.upsertedId = null
    }

    return result
}