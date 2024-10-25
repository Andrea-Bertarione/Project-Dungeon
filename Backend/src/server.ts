import Express, { Application, Request, Response, NextFunction, ErrorRequestHandler } from "express"
import { MongoClient, ServerApiVersion } from "mongodb"
import helmet from "helmet"
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
    const db_Client: MongoClient | undefined = await connectDatabase(debug);

    if (!db_Client) {
        console.error("Database connection error, shutting down");
        return;
    }

    await loadRoutes(app, db_Client, debug);

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

export const loadMiddlewares = (app: Application) => {
    app.use(helmet());
}

export const loadRoutes = async (app: Application, db_Client: MongoClient, debug: Boolean) => {
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
            
            const db_Middleware = async (req: Request, res: Response, next: NextFunction) => {
                req.db_Client = db_Client;
                req.db = db_Client.db(debug ? "dev" : "prod");

                next();
            }

            // Validate route data
            if (validateRouteData(routeData)) {
            routeData.middlewares.push(db_Middleware);

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

export const connectDatabase = async (debug: Boolean) => {
    if (!process.env.DATABASE_CONNECTION_STRING) { return; }

    const client = new MongoClient(process.env.DATABASE_CONNECTION_STRING, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        await client.db(debug ? "dev" : "prod").command({ ping: 1 });
        console.log("Succesfully connected to the database");
    }
    catch(err) {
        console.error("Database connection error: " + err);
    }

    return client;
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