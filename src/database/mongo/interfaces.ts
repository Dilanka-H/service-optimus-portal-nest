export interface Response {
  acknowledged: boolean,
  upsertedId: string,
  upsertedCount: number,
  matchedCount: number,
  modifiedCount: number
}