"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userRoutes_1 = require("../routes/userRoutes");
var authenticate_1 = require("../middleware/authenticate");
var userController_1 = require("../controller/userController");
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.configRoutes = function (app) {
        app.get('/', function (req, res) {
            res.status(200).json({ "Success": "Server is running" });
        });
        var userControllerObj = new userController_1.userAppController();
        app.post('/register', userControllerObj.registerUser);
        app.post('/login', userControllerObj.login);
        app.use(authenticate_1.AuthenticateService.authenticate);
        app.use('/user', userRoutes_1.userRoutes);
    };
    return Routes;
}());
exports.Routes = Routes;
