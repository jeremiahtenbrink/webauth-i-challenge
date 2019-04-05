"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const auth_1 = require("./src/auth/auth");
const path = require('path');
const cors = require('cors');
const apiDocsPath = path.join(__dirname, './apidoc');
const Register = require('./src/register/register');
const Login = require('./src/login/Login');
const Users = require('./src/users/Users');
const server = express_1.default();
server.use(helmet_1.default());
server.use(cors());
server.use(express_1.default.json());
server.use('/api/register', Register);
server.use('/api/login', Login);
server.use('/api/users', auth_1.Authentication, Users);
server.use('/', express_1.default.static(apiDocsPath));
exports.default = server;
//# sourceMappingURL=server.js.map