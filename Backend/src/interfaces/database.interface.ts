import { Document, ObjectId } from "mongodb";

export interface UserDocument extends Document {
    _id?: ObjectId,
    name?: String,
    surname?: String,
    email?: String,
    password?: String,
    displayName?: String,
}