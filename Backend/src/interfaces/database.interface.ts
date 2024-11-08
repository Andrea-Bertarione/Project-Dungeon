import { Document, ObjectId } from "mongodb";

export interface UserDocument extends Document {
    _id?: ObjectId,
    name?: string,
    surname?: string,
    email?: string,
    password?: string,
    displayName?: string,
}

export interface UserSessionDocument extends Document {
    _id?: ObjectId,

}