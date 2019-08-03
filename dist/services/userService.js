"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var userAppModel_1 = require("../model/userAppModel");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jwt = __importStar(require("jsonwebtoken"));
var userAppService = /** @class */ (function () {
    function userAppService() {
    }
    userAppService.registerUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var encryptedPassword, newUser, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 12)];
                    case 1:
                        encryptedPassword = _a.sent();
                        req.body.password = encryptedPassword;
                        newUser = new userAppModel_1.userAppModel(req.body);
                        return [4 /*yield*/, newUser.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, newUser];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, err_1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userAppService.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userItem, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userAppModel_1.userAppModel.findOneAndUpdate({ "email": req.query.email }, req.body, { new: true }).exec()];
                    case 1:
                        userItem = _a.sent();
                        return [2 /*return*/, userItem];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [2 /*return*/, err_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userAppService.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userItem, passwordMatch, options, payload, token, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, userAppModel_1.userAppModel.findOne({ email: req.body.email }).exec()];
                    case 1:
                        userItem = _a.sent();
                        if (!userItem) return [3 /*break*/, 6];
                        return [4 /*yield*/, bcrypt_1.default.compare(req.body.password, userItem.password)];
                    case 2:
                        passwordMatch = _a.sent();
                        if (!passwordMatch) return [3 /*break*/, 4];
                        options = { expiresIn: "2h" };
                        payload = { "email": userItem.email, "name": userItem.name };
                        return [4 /*yield*/, jwt.sign(payload, "secret", options)];
                    case 3:
                        token = _a.sent();
                        console.log("Token generated is " + token);
                        return [2 /*return*/, { "token": token }];
                    case 4: return [2 /*return*/, "Password Incorrect"];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, "User not registered by Email"];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [2 /*return*/, err_3];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    userAppService.getAllUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userAppModel_1.userAppModel.find().exec()];
                    case 1:
                        allUsers = _a.sent();
                        return [2 /*return*/, allUsers];
                    case 2:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [2 /*return*/, err_4];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userAppService.getUserByEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userItem, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("name from queryString : ", req.query.email);
                        return [4 /*yield*/, userAppModel_1.userAppModel.findOne({ name: req.query.email }).exec()];
                    case 1:
                        userItem = _a.sent();
                        return [2 /*return*/, userItem];
                    case 2:
                        err_5 = _a.sent();
                        console.log(err_5);
                        return [2 /*return*/, err_5];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return userAppService;
}());
exports.userAppService = userAppService;
