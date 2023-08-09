"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var error_1 = __importDefault(require("./models/error"));
var catch_all_1 = __importDefault(require("./middleware/catch-all"));
var user_routes_1 = __importDefault(require("./routes/user-routes"));
var auth_routes_1 = __importDefault(require("./routes/auth-routes"));
var event_routes_1 = __importDefault(require("./routes/event-routes"));
var ticket_routes_1 = __importDefault(require("./routes/ticket-routes"));
var deal_routes_1 = __importDefault(require("./routes/deal-routes"));
var category_routes_1 = __importDefault(require("./routes/category-routes"));
var bid_routes_1 = __importDefault(require("./routes/bid-routes"));
var subscribe_routes_1 = __importDefault(require("./routes/subscribe-routes"));
var stripe_routes_1 = __importDefault(require("./routes/stripe-routes"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("./utils/config");
var body_parser_1 = __importDefault(require("body-parser"));
var passport_1 = __importDefault(require("passport"));
var express_session_1 = __importDefault(require("express-session"));
require("./utils/facebook-auth");
require("./utils/google-auth");
dotenv_1.default.config();
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(config_1.config.mongo.url, {
    retryWrites: true,
    w: "majority",
})
    .then(function () {
    console.log("connected");
})
    .catch(function (err) { return console.log(err); });
var server = (0, express_1.default)();
server.use((0, cors_1.default)({
    origin: [process.env.CLIENT_SIDE_URL],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "refreshToken"],
    exposedHeaders: ["Authorization", "refreshToken"],
    credentials: true,
}));
// PRODUCTION
// server.set("trust proxy", 1);
// server.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       sameSite: "none",
//       secure: true,
//       maxAge: 1000 * 60 * 60 * 24 * 2, // two days
//     },
//   })
// );
// DEVELOPMENT
server.use((0, express_session_1.default)({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
}));
server.use(passport_1.default.initialize());
server.use(passport_1.default.session());
server.use(body_parser_1.default.json({ limit: "5mb" }));
server.use(body_parser_1.default.urlencoded({
    limit: "10mb",
    extended: false,
}));
server.use(express_1.default.json());
server.use("/hotix/api/users", user_routes_1.default);
server.use("/hotix/api/auth", auth_routes_1.default);
server.use("/hotix/api/events", event_routes_1.default);
server.use("/hotix/api/tickets", ticket_routes_1.default);
server.use("/hotix/api/deals", deal_routes_1.default);
server.use("/hotix/api/categories", category_routes_1.default);
server.use("/hotix/api/bids", bid_routes_1.default);
server.use("/hotix/api/subscribes", subscribe_routes_1.default);
server.use("/hotix/api/payments", stripe_routes_1.default);
server.use("*", function (Request, response, next) {
    next(new error_1.default(404, "route not found!"));
});
server.use(catch_all_1.default);
server.listen(process.env.PORT, function () {
    return console.log("listening on port " + process.env.PORT);
});
