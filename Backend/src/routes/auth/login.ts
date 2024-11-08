import { Request, Response } from "express";
import { DefaultRestRoute } from "@interfaces/routes.interface.js";
import { ResponseSuccess } from "@interfaces/response.interface.js";

import { loginMW, loginPassportMW } from "@middlewares/user.middleware.js";

const route: DefaultRestRoute = {
    endpoint: "login",
    method: "post",
    middlewares: [ loginMW, loginPassportMW ],
    handler: async (req: Request, res: Response) => {

        const userDataResponse: ResponseSuccess = {
            status: "success",
            data: {
                message: "Logged in succesfully"
            }
        };

        res.status(200).json(userDataResponse);
        return;
    }
}

export default route;