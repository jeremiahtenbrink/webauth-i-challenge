"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_model_1 = require("../login/login-model");
exports.Authentication = async (req, res, next) => {
    const headers = req.headers;
    if (!headers.auth_token) {
        res.status(401).json({
            message: 'You must include a auth token to reach' +
                ' this endpoint.'
        });
        return;
    }
    else {
        let loggedIn = await login_model_1.isUserLoggedIn(headers.auth_token);
        if (loggedIn) {
            next();
        }
        else {
            res.status(401).json({
                message: "You are not logged in. Please" +
                    " login in to continue."
            });
        }
    }
};
//# sourceMappingURL=auth.js.map