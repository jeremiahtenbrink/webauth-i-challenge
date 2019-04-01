import { Request, Response } from "express";
import { isUserLoggedIn } from '../login/login-model';
import { error, sendError } from "../error/error";

export const Authentication = async ( req: Request, res: Response, next: any ) => {
    const headers = req.headers;
    if ( !headers.auth_token ) {
        res.status( 401 ).json( {
            message: 'You must include a auth token to reach' +
                ' this endpoint.'
        } );
        return;
    } else {
        let loggedIn = await isUserLoggedIn( headers.auth_token );
        if ( loggedIn ) {
            next();
        } else {
            res.status( 401 ).json( {
                message: "You are not logged in. Please" +
                    " login in to continue."
            } );
        }
    }
};


