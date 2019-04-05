import express from "express";
import helmet from 'helmet';
import { Authentication } from "./src/auth/auth";


const path = require( 'path' );
const cors = require( 'cors' );
const apiDocsPath = path.join( __dirname, './apidoc' );


const Register = require( './src/register/register' );
const Login = require( './src/login/Login' );
const Users = require( './src/users/Users' );


const server = express();

server.use( helmet() );
server.use( cors() );
server.use( express.json() );

server.use( '/api/register', Register );
server.use( '/api/login', Login );
server.use( '/api/users', Authentication, Users );
server.use( '/', express.static( apiDocsPath ) );

export default server;