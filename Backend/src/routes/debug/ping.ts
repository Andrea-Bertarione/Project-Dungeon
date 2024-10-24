import { Request, Response } from "express";

import { DefaultRestRoute } from "@interfaces/routes.interface.js";
import { ResponseSuccess } from "@interfaces/response.interface.js";

const route: DefaultRestRoute = {
    endpoint: "ping",
    method: "get",
    middlewares: [ ],
    handler: async (req: Request, res: Response) => {
        const userDataResponse: ResponseSuccess = {
            status: "success",
            data: {
                message: "ping"
            }
        };

        res.status(200).json(userDataResponse);
        return;
    }
}

export default route;