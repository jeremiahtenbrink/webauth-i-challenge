"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Login = __importStar(require("./login-model"));
const error_1 = require("../error/error");
const usersRouter = require('express').Router();
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
usersRouter.post('/', async (req, res) => {
    try {
        const login = req.body;
        if (!login.email || !login.password) {
            error_1.sendError(error_1.error(400, "You must send a password and email" +
                " address."), res);
            return;
        }
        const result = await Login.login(login);
        if (result) {
            res.status(200).json({ token: result.token });
            return;
        }
        error_1.sendError(error_1.error(500, "Server Error"), res);
        return;
    }
    catch (e) {
        res.status(500).json(e);
    }
});
module.exports = usersRouter;
//# sourceMappingURL=login.js.map