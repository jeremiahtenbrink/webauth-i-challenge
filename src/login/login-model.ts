import { database } from '../../data/dbConfig';
import { ILogin } from "./ILogin";
import * as Users from '../users/users-model';
import bcrypt from 'bcrypt';
import { error } from '../error/error';
import uuid from 'uuid';

export const login = async ( login: ILogin ) => {
    
    const user = await Users.getUsersByEmail( login.email );
    
    const passwordMatch = bcrypt.compareSync( login.password, user.password );
    
    if ( !passwordMatch ) {
        throw error( 401, "Invalid Credentials" );
    }
    
    const record = await database( 'login' ).where( { email: login.email } )
        .first();
    if ( record ) {
        const deleted = await database( 'login' )
            .where( { email: login.email } ).delete();
        if ( !deleted ) {
            throw error( 500, "Internal server error" );
        }
    }
    
    const token = uuid.v4();
    const ids = await database( 'login' )
        .insert( { email: login.email, token } );
    
    if ( ids[ 0 ] ) {
        return database( 'login' )
            .select( "token" )
            .where( { email: login.email} ).first();
    }
    
};

export const isUserLoggedIn = async ( token: string | string[] ) => {
   let record = await database('login').where({token}).first();
   
   return !!record;
};