import { NestMiddleware, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as jwt from 'jsonwebtoken';
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { jwtSecret } from "config/jwt.secret";
import { UserService } from "src/services/user/user.service";

import { Logger } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(public administratorService: AdministratorService,
                public userService: UserService,
        ) { }
    async use(req: Request, res: Response, next: NextFunction) {
        let jwtData: any;
        let token : string;

        if(!req.headers.authorization) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }

        token = req.headers.authorization;

        const tokenParts = token.split(' ');

        if (tokenParts.length !== 2) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }
        const tokenString = tokenParts[1];
        if (tokenString && tokenString !== "null") {
            try{
                jwtData = jwt.verify(tokenString, jwtSecret);
            } catch (e){
                throw new HttpException('Token not found1', HttpStatus.UNAUTHORIZED);
            }
        } else {
            jwtData = new JwtDataDto();
            jwtData.role = "guest";
            jwtData.id = 0;
            jwtData.identity = "guest";
            jwtData.exp = (new Date().getTime() / 1000 + (60 * 60 * 24 * 14));
            jwtData.ip = req.ip.toString();
            jwtData.ua = req.headers["user-agent"];
            token = jwt.sign(jwtData.toPlainObject(), jwtSecret);
        }

        if (!jwtData) {
            throw new HttpException('Token not found2', HttpStatus.UNAUTHORIZED);
        }

        if (jwtData.ip !== req.ip.toString()) {
            throw new HttpException('Token not found3', HttpStatus.UNAUTHORIZED);
        }
        if (jwtData.ua !== req.headers["user-agent"]) {
            throw new HttpException('Token not found4', HttpStatus.UNAUTHORIZED);
        }

        if(jwtData.role === "administrator"){
            const administrator = await this.administratorService.getById(jwtData.id);
            if (!administrator) {
                throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
            }
            req.token = jwtData;
            next();
        } else if(jwtData.role === "user"){
            const user = await this.userService.getById(jwtData.id);
            if (!user) {
                throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
            }

            const trenutniTimestamp = new Date().getTime() / 1000;
            if (trenutniTimestamp >= jwtData.exp) {
                throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
            }

            req.token = jwtData;
            next();
        } else if(jwtData.role === "guest"){
            next();
        }


}
}