"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyparser = __importStar(require("body-parser"));
var db_1 = require("./startup/db");
var route_1 = require("./startup/route");
var UserApp = /** @class */ (function () {
    function UserApp() {
        this.app = express_1.default();
        this.app.listen(3000, 'localhost', function (req, res) {
            console.log("server is started and running on port 3000");
        });
        this.configBodyParser();
        route_1.Routes.configRoutes(this.app);
        db_1.Db.connectToMongoDb();
    }
    UserApp.prototype.configBodyParser = function () {
        //code to view the Body
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({ extended: false }));
    };
    return UserApp;
}());
exports.userApp = new UserApp();
