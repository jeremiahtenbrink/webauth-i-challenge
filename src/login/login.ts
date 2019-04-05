import { Request, Response } from "express";
import { ILogin } from "./ILogin";
import * as Login from './login-model';
import { error, sendError } from "../error/error";

const usersRouter = require( 'express' ).Router();


/**
 * @api {post} /api/login Log in a user
 * @apiVersion 1.0.0
 * @apiName LogInUser
 * @apiGroup Login
 *
 * @apiExample Post example:
 * axios.post('/api/login', {
 *     email: "usersEmailAddress@yahoo.com",
 *     password: "users password"
 * });
 *
 * @apiParam {String} email         The users email address.
 * @apiParam {string} password      The users password.
 *
 * @apiUse Error
 * @apiSampleRequest off
 *
 * @apiSuccess {String} token           Users auth token.
 * @apiSuccessExample {json} Example:
 *  {
 *     "token": "fhi32of8dpfkd;lh248u980de9a8fh2n;l"
 *  }
 *
 *
 */
usersRouter.post( '/', async ( req: Request, res: Response ) => {
    try {
        
        const login: ILogin = req.body;
        
        if ( !login.email || !login.password ) {
            sendError( error( 400, "You must send a password and email" +
                " address." ), res );
            return;
        }
        
        const result = await Login.login( login );
        if ( result ) {
            res.status( 200 ).json( { token: result.token } );
            return;
        }
        
        sendError( error( 500, "Server Error" ), res );
        return;
        
    } catch ( e ) {
        res.status( 500 ).json( e );
    }
    
    
} );

module.exports = usersRouter;
