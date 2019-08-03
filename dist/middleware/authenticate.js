"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));
var AuthenticateService = /** @class */ (function () {
    function AuthenticateService() {
    }
    AuthenticateService.authenticate = function (req, res, next) {
        var token = req.header("Authorization");
        if (token == null) {
            //validate the token
            res.json("Access Denied");
        }
        try {
            var decodedData = jwt.verify(token, "secret");
            req.user = decodedData;
            next();
        }
        catch (err) {
            console.log(err);
            return res.json(err);
        }
    };
    return AuthenticateService;
}());
exports.AuthenticateService = AuthenticateService;
