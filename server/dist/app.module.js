"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const unauthorized_exception_filter_1 = require("./filters/unauthorized-exception.filter");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: unauthorized_exception_filter_1.AllExceptionsFilter,
            },
        ],
        imports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.DB),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map