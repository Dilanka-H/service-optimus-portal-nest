import { Schema } from "mongoose";
import * as mongooseFieldEncryption from "mongoose-field-encryption";
import { MongoConfiguration } from "src/config/mongo.config";
import * as crypto from "crypto"

export function applyEncryption(
  schema: Schema<any>,
  mongoConfig: MongoConfiguration,
  fieldsToEncrypt: string[],
) {
  schema.plugin(mongooseFieldEncryption.fieldEncryption, {
    fields: fieldsToEncrypt, 
    secret: decryptDataKey(mongoConfig.mongoEncryptMasterKey, mongoConfig.mongoEncryptDataKey) , 
    saltGenerator: () => mongoConfig.mongoSaltGenerator, 
  });
}

function decryptDataKey (masterKey, encryptedDataKey) {
  const secret = crypto.createHash("sha256").update(masterKey).digest("hex").substring(0, 32);
  return mongooseFieldEncryption.decrypt(encryptedDataKey, secret);
}