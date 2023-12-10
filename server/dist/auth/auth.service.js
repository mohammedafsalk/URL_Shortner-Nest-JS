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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../schema/user/user.schema");
const signup_dto_1 = require("./dto/signup-dto");
const bcrypt = require("bcrypt");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const jwt_1 = require("@nestjs/jwt");
const login_dto_1 = require("./dto/login-dto");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signUp(signUpDto) {
        const validatedDto = (0, class_transformer_1.plainToClass)(signup_dto_1.SignUpDto, signUpDto);
        const validationErrors = await (0, class_validator_1.validate)(validatedDto, {
            skipMissingProperties: true,
        });
        const emailErrors = validationErrors.filter((error) => error.property === 'email');
        if (emailErrors.length > 0) {
            throw new common_1.BadRequestException(emailErrors[0].constraints);
        }
        const { username, email, password } = signUpDto;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return { message: 'User successfully created' };
    }
    async login(loginDto) {
        const validatedDto = (0, class_transformer_1.plainToClass)(login_dto_1.lognInDto, loginDto);
        const validationErrors = await (0, class_validator_1.validate)(validatedDto, {
            skipMissingProperties: true,
        });
        const emailErrors = validationErrors.filter((error) => error.property === 'email');
        if (emailErrors.length > 0) {
            throw new common_1.BadRequestException(emailErrors[0].constraints);
        }
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.jwtService.sign({
            id: user._id,
            email: user.email,
            name: user.name,
        });
        return { user, token };
    }
    async checkLogin(request) {
        let loggedIn;
        const token = request.cookies['token'];
        if (!token) {
            throw new common_1.ForbiddenException('Token is required');
        }
        try {
            const decoded = this.jwtService.verify(token);
            request.user = decoded;
            return true;
        }
        catch (err) {
            return false;
        }
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "checkLogin", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose.Model, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map