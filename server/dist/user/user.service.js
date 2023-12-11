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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../schema/user/user.schema");
const mongoose = require("mongoose");
const uuid_1 = require("uuid");
const url_schema_1 = require("../schema/url/url.schema");
let UserService = class UserService {
    constructor(userModel, urlModel) {
        this.userModel = userModel;
        this.urlModel = urlModel;
    }
    async getusers() {
        try {
            const users = await this.userModel.find();
            if (users && users.length > 0) {
                return { users };
            }
            else {
                return { message: 'No users found' };
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Internal Server Error');
        }
    }
    async createUrl(urldto) {
        const { title, shortUrl, userId } = urldto;
        const longUrl = `http://localhost:3000//${(0, uuid_1.v4)()}`;
        const newUrl = new this.urlModel({ title, shortUrl, longUrl, userId });
        try {
            await newUrl.save();
        }
        catch (error) {
            throw new common_1.NotFoundException('Failed to create');
        }
    }
    async viewUrls(userId) {
        try {
            const urls = await this.urlModel
                .find({ userId })
                .sort({ _id: -1 })
                .populate('userId')
                .lean();
            return urls;
        }
        catch (error) {
            throw new common_1.NotFoundException('Failed to fetch data');
        }
    }
    async getRedirect(urlId) {
        try {
            const longUrl = `http://localhost:3000//${urlId}`;
            const redirectUrl = await this.urlModel.findOne({ longUrl });
            return redirectUrl;
        }
        catch (error) {
            throw new common_1.NotFoundException('Failed to fetch data');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(url_schema_1.Url.name)),
    __metadata("design:paramtypes", [mongoose.Model, mongoose.Model])
], UserService);
//# sourceMappingURL=user.service.js.map