import { MongoClient, Db} from "mongodb"

declare global {
    namespace Express {
      interface Request {
        db_Client: MongoClient
        db: Db  
      }
    }
  }