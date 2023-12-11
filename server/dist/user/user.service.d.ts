/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { User } from 'src/schema/user/user.schema';
import * as mongoose from 'mongoose';
import { Url } from 'src/schema/url/url.schema';
import { UrlDto } from 'src/auth/dto/url-dto';
export declare class UserService {
    private userModel;
    private urlModel;
    constructor(userModel: mongoose.Model<User>, urlModel: mongoose.Model<Url>);
    getusers(): Promise<{
        users?: User[];
        message?: boolean | string;
    }>;
    createUrl(urldto: UrlDto): Promise<void>;
    viewUrls(userId: string): Promise<any>;
    getRedirect(urlId: string): Promise<any>;
}
