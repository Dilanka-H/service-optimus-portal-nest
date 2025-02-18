declare global {
  namespace Express {
    interface Request {
      id?: string;
      startTime?: number
      parsedData?:any
    }
  }
} 

export { };

