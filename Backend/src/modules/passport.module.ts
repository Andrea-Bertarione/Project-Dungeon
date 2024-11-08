import { Db, Filter, FindOptions, MongoClient, MongoOptions } from "mongodb";
import passport from "passport"
import { Strategy } from "passport-local"
import { comparePassword } from "@modules/security.module"

import { UserDocument } from "@interfaces/database.interface.js";
import { Application } from "express";

export const initPassport = (app: Application, db_Client: MongoClient, debug: Boolean) => {
    const db: Db = db_Client.db(debug ? "dev" : "prod");
    const userCollection = db.collection<UserDocument>("users");

    passport.use("user-login-email-strategy", new Strategy({
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        const query: Filter<UserDocument> = {
            email: email,
        };

        const options: FindOptions = {
            projection: { _id: 1, password: 1 }
        };

        try {
            const user = await userCollection.findOne(query, options);

            if (!user) { return done(null, false, { message: 'Incorrect email or password.' }); }
            if (!user.password) { return done(null, false, { message: 'Incorrect email or password.' }); }

            if (await comparePassword(password, user.password)) { 
                return done(null, { _id: user._id }); 
            }
        }
        catch (err) {
            return done(err);
        }

        return done(null, false, { message: 'Incorrect email or password.' });
    }));

    passport.serializeUser((user: UserDocument, done) => {
        done(null, user);
      });
      
    passport.deserializeUser((user: UserDocument, done) => {
        done(null, user);
    });

    app.use(passport.initialize());
    app.use(passport.session());
}