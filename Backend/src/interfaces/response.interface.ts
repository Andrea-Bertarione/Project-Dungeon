export type ResponseStatus = "success" | "error";

export interface Response {
    status: ResponseStatus
}

export interface ResponseError extends Response {
    message: String
}

export interface ResponseSuccess extends Response {
    data: Object
}