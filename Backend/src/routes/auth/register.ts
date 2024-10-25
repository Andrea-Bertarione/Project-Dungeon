import { Request, Response } from "express";
import { DefaultRestRoute } from "@interfaces/routes.interface.js";
import { ResponseSuccess } from "@interfaces/response.interface.js";
import { UserDocument } from "@interfaces/database.interface.js";
import { Filter, FindOptions, InsertOneResult } from "mongodb";

import { registerMW } from "@middlewares/user.middleware.js";

const route: DefaultRestRoute = {
    endpoint: "register",
    method: "put",
    middlewares: [ registerMW ],
    handler: async (req: Request, res: Response) => {
        const { name, surname, email, password, displayName } = req.body;
        const userCollection = req.db.collection<UserDocument>("users");

        //rember to try passport and add the rest of the logic

        const userDataResponse: ResponseSuccess = {
            status: "success",
            data: {
                message: "Testing"
            }
        };

        res.status(200).json(userDataResponse);
        return;
    }
}

export default route;