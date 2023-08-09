"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isUserAuthenticated = function (request, response, next) {
    if (request.user) {
        console.log("OK");
        next();
    }
    else {
        console.log("Not OK");
        response.status(401).send("You have no permission!");
    }
};
exports.default = isUserAuthenticated;
