import Express, { Application, Request, Response, NextFunction, ErrorRequestHandler } from "express"
import { promises } from "fs";
import dotenv from "dotenv";

import { DefaultRestRoute } from "@interfaces/routes.interface.js";

try {
    dotenv.config({ path: "./.env" });
  } catch (error) {
    console.error("Error loading environment variables:", error);
    process.exit(1);
}


export const initServer = async (debug: Boolean) => {
    if (debug) {
        console.time("Start up time");
    }

    const app: Application = Express();

    await loadRoutes(app);

    app.listen(process.env.PORT, () => {
        console.log("\nApi running on port: ", process.env.PORT);
        
        if (debug) {
            console.log("\nDebug Profile");
            console.timeEnd("Start up time");
            console.log("\nRoutes registered:");
            app._router.stack.forEach((r: any) => {
                if (r.route && r.route.path){
                    console.log(r.route.path);
                }
            });
        }
    })

    return app;
}

export const loadRoutes =  async (app: Application) => {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    });

    try {
        // Load and mount REST routes
        const restDir: string[] = await promises.readdir("./src/routes");

        for (const restDirCategory of restDir) {
        const categoryDir: string[] = await promises.readdir(`./src/routes/${restDirCategory}`);

        for (const routeFile of categoryDir) {
            const routePath = `./routes/${restDirCategory}/${routeFile}`;
            const routeData: DefaultRestRoute = (await import(routePath)).default;

            // Validate route data
            if (validateRouteData(routeData)) {
            app[routeData.method](
                `/${restDirCategory}/${routeData.endpoint}`,
                routeData.middlewares,
                routeData.handler
            );
            } else {
            console.error(`Invalid route data in file: ${routePath}`);
            }
        }
        }
    }
    catch (error) {
        console.error("Error while setting up routes:", error);
        // Handle and log errors gracefully
    }
}

export const validateRouteData = (routeData: any): routeData is DefaultRestRoute => {
    return (
      routeData != undefined &&
      typeof routeData === "object" &&
      (typeof routeData.method === "string" || typeof routeData.filePath === "string") &&
      typeof routeData.endpoint === "string" &&
      Array.isArray(routeData.middlewares) &&
      typeof routeData.handler === "function" &&
      Object.keys({
          endpoint: "",
          middlewares: [],
          handler: () => {},
          ...routeData
      }).length == 4
    );
  }