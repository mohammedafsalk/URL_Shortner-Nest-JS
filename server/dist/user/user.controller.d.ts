import { UserService } from './user.service';
import { Response } from 'express';
import { UrlDto } from 'src/auth/dto/url-dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getusers(res: Response): Promise<void>;
    urlSubmit(body: UrlDto, res: Response): Promise<void>;
    viewUrls(userId: string, res: Response): Promise<any>;
    getRedirect(urlId: string, res: Response): Promise<any>;
}
