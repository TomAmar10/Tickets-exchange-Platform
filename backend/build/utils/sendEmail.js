"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmailContent = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var createEmailContent = function (link, fName) {
    var html = "\n  <html>\n  <head>\n    <style>\n      body {\n        font-family: Arial, sans-serif;\n        line-height: 1.6;\n        text-align: center;\n        margin: 0;\n        padding: 0;\n      }\n      .container {\n        text-align: center;\n        direction: ltr;\n        margin: 0 auto;\n        padding: 2rem;\n        max-width: 600px;\n      }\n      h1 {\n        font-size: 2.5rem;\n        margin-bottom: 1.5rem;\n        font-weight: bold;\n        color: #5f17e1;\n      }\n      .header{\n        font-weight: 500;\n        font-size: 1.1rem;\n      }\n      p{\n        text-align: center;\n      }\n      a {\n        padding: 0.5rem 1rem;\n        text-decoration: none;\n        border-radius: 5px;\n        font-weight: 400;\n        font-size: 1rem;\n        border: none;\n        background-color: #5f17e1;\n        color: #ffffff !important;\n        margin-top: 1rem;\n        display: block;\n        width: max-content;\n        margin: auto;\n      }\n    </style>\n  </head>\n  <body>\n  <div class=\"container\">\n  <h1>Hotix</h1>\n  <span class=\"header\">Reset password</span>\n  <hr />\n  <p>Dear ".concat(fName, ",</p>\n  <p>Forgot your password? <br />\n  We received a request to reset the password for your account.</p>\n  <span>To reset your password, click on the button below:</span>\n  <a href=\"").concat(link, "\" target=\"_blank\">Reset password</a>\n  <p>Thank you!</p>\n  </div>\n  </body>\n</html>\n  ");
    return html;
};
exports.createEmailContent = createEmailContent;
var sendEmail = function (email, subject, html) { return __awaiter(void 0, void 0, void 0, function () {
    var transporter, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                transporter = nodemailer_1.default.createTransport({
                    host: process.env.EMAIL_HOST,
                    service: process.env.EMAIL_SERVICE,
                    port: Number(process.env.EMAIL_PORT),
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                });
                return [4 /*yield*/, transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: email,
                        subject: subject,
                        html: html,
                    })];
            case 1:
                result = _a.sent();
                console.log("email sent successfully");
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log("email not sent!");
                console.log(error_1);
                return [2 /*return*/, error_1];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = sendEmail;
