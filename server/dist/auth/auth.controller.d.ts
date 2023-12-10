import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-dto';
import { lognInDto } from './dto/login-dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto, res: Response): Promise<void>;
    login(loginDto: lognInDto, res: Response): Promise<void>;
    checkLogin(request: any, res: Response): Promise<void>;
    logout(res: Response): void;
}
