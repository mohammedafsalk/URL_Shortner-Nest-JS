import { UserService } from './user.service';
import { Response } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getusers(res: Response): Promise<void>;
}
