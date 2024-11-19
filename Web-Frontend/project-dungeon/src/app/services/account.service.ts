import { Injectable } from "@angular/core";

export interface accountData {
    name?: string,
    surname?: string,
    email: string,
    password: string,
    displayName?: string,
}

@Injectable({
    providedIn: 'root'
})
export class accountService {
    loggedIn = localStorage.getItem("loggedIn");
    username = localStorage.getItem("username");


    login = (data: accountData) => {
        
    }

    register = (data: accountData) => {
        
    }
}