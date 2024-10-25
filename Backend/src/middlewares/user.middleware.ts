import { RequestHandler, Request, Response, NextFunction } from "express";
import { errorDefault } from "@modules/errors.module.js";

export const dateIsValid = (date: string | number) => {
    const parsedDate = new Date(date);

    return parsedDate instanceof Date && !isNaN(Number(parsedDate));
}

const validEmailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const registerMW = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body) {
        errorDefault.message = "Request body is empty";
        res.status(400).json(errorDefault);
        return;
    }

    if (!req.body.name) {
        errorDefault.message = "Request body.name parameter is missing or empty";
        res.status(400).json(errorDefault);
        return;
    }

    if (!req.body.surname) {
        errorDefault.message = "Request body.surname parameter is missing or empty";
        res.status(400).json(errorDefault);
        return;
    }

    if (!req.body.birthday) {
        errorDefault.message = "Request body.birthday parameter is missing or empty";
        res.status(400).json(errorDefault);
        return;
    }

    if (req.body.name.length > 50 || req.body.name.length < 3) {
        errorDefault.message = "Request body.name parameter must be between 3 and 50 characters";
        res.status(400).json(errorDefault);
        return;
    }

    if (req.body.surname.length > 50 || req.body.surname.length < 3) {
        errorDefault.message = "Request body.surname parameter must be between 3 and 50 characters";
        res.status(400).json(errorDefault);
        return;
    }

    if (req.body.displayName.length > 50 || req.body.displayName.length < 3) {
        errorDefault.message = "Request body.displayName parameter must be between 3 and 50 characters";
        res.status(400).json(errorDefault);
        return;
    }

    next();
}

export const loginMW = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body) {
        errorDefault.message = "Request body is empty";
        res.status(400).json(errorDefault);
        return;
    }

    if (!req.body.email) {
        errorDefault.message = "Request body.email parameter is missing or empty";
        res.status(400).json(errorDefault);
        return;
    }

    if (!req.body.password) {
        errorDefault.message = "Request body.password parameter is missing or empty";
        res.status(400).json(errorDefault);
        return;
    }

    if (!req.body.email.match(validEmailRegex)) {
        errorDefault.message = "Request body.email parameter is not a valid email";
        res.status(400).json(errorDefault);
        return;
    }

    if (req.body.password.length > 50 || req.body.password.length < 8) {
        errorDefault.message = "Request body.password parameter must be between 8 and 50 characters";
        res.status(400).json(errorDefault);
        return;
    }

    next();
}