"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_guard_1 = require("../guards/auth.guard");
const url_dto_1 = require("../auth/dto/url-dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getusers(res) {
        try {
            const users = await this.userService.getusers();
            res.json({ success: true, users });
        }
        catch (error) {
            res.json({ success: false, error: error });
        }
    }
    async urlSubmit(body, res) {
        try {
            await this.userService.createUrl(body);
            res.json({ success: true });
        }
        catch (err) {
            res.json({ success: false });
        }
    }
    async viewUrls(userId, res) {
        try {
            const urls = await this.userService.viewUrls(userId);
            if (urls.length > 0) {
                res.json({ success: true, urls });
            }
            else {
                res.json({ success: true, message: 'No url added' });
            }
        }
        catch (error) {
            res.json({ success: false, error: error.message });
        }
    }
    async getRedirect(urlId, res) {
        try {
            const url = await this.userService.getRedirect(urlId);
            res.json({ success: true, url });
        }
        catch (error) {
            res.json({ success: false, error: error.message });
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getusers", null);
__decorate([
    (0, common_1.Post)('url'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [url_dto_1.UrlDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "urlSubmit", null);
__decorate([
    (0, common_1.Get)('allurls/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "viewUrls", null);
__decorate([
    (0, common_1.Get)('redirect/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getRedirect", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map