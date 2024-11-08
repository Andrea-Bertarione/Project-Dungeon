import { Request, Response } from "express";
import { DefaultRestRoute } from "@interfaces/routes.interface.js";
import { ResponseSuccess, ResponseError } from "@interfaces/response.interface.js";
import { UserDocument } from "@interfaces/database.interface.js";
import { Filter, FindOptions, InsertManyResult, InsertOneResult } from "mongodb";
import { cryptPassword } from "@modules/security.module";

import { registerMW, loginMW } from "@middlewares/user.middleware.js";

const route: DefaultRestRoute = {
    endpoint: "register",
    method: "put",
    middlewares: [ registerMW, loginMW ],
    handler: async (req: Request, res: Response) => {
        const { name, surname, email, password, displayName } = req.body;
        const userCollection = req.db.collection<UserDocument>("users");

        const query: Filter<UserDocument> = {
            email: email,
        };

        const options: FindOptions = {
            projection: { _id: 1 }
        };

        const userExists: UserDocument | null = await userCollection.findOne(query, options);

        if (userExists) {
            const userDataResponse: ResponseError = {
                status: "error",
                message: "Error, account already exists"
            };
    
            res.status(400).json(userDataResponse);
            return;
        }

        const generatedPasswordHash = await cryptPassword(password);
        const newUser: UserDocument = {
            name: name,
            surname: surname,
            email: email,
            password: generatedPasswordHash,
            displayName: displayName
        }

        const insertRes: InsertOneResult<UserDocument> = await userCollection.insertOne(newUser);

        if (!insertRes.acknowledged) {
            const userDataResponse: ResponseError = {
                status: "error",
                message: "Error, database error, try again later."
            };
    
            res.status(400).json(userDataResponse);
            return;
        }

        const userDataResponse: ResponseSuccess = {
            status: "success",
            data: {
                message: "Account created succesfully"
            }
        };

        res.status(200).json(userDataResponse);
        return;
    }
}

export default route;