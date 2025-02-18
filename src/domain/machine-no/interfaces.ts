import { Machines } from "src/database/mongo/schema/optimusconfigs.schema"

export interface IQueryMachineNoResponse {
    Machines?: Machines[]
    resultMessage?: string
}

export interface IReserveMachineNoResponse {
    result: string
}