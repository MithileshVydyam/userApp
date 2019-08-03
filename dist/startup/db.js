"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Db = /** @class */ (function () {
    function Db() {
    }
    Db.connectToMongoDb = function () {
        mongoose_1.default.connect(this.connectionString, { useNewUrlParser: true })
            .then(function () { console.log("Db connection success"); })
            .catch(function (err) {
            console.log("Db connection failed");
            console.log(err);
        });
    };
    Db.connectionString = "mongodb://localhost:27017/userApp";
    return Db;
}());
exports.Db = Db;
