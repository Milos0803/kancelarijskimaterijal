import { Controller, Post, Body, Req, Put, HttpStatus, HttpException } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { LoginAdministratorDto } from "src/dtos/administrator/login.administrator.dto";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from 'crypto';
import { LoginInfoDto } from "src/dtos/auth/login.info.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { Request } from "express";
import { jwtSecret } from "config/jwt.secret";
import { UserRegistrationDto } from "src/dtos/user/user.register.dto";
import { UserService } from "src/services/user/user.service";
import { LoginUserDto } from "src/dtos/user/login.user.dto";
import { JwtRefreshDataDto } from "src/dtos/auth/jwt.data.refresh.dto";
import { UserRefreshTokenDto } from "src/dtos/auth/user.refresh.token.dto";

@Controller('auth')
export class AuthController {
    constructor(
        public administratorService: AdministratorService,
        public userService: UserService,
    ) { }

    @Post('administrator/login')
    async doAdministratorLogin(@Body() data: LoginAdministratorDto, @Req() req: Request): Promise<LoginInfoDto | ApiResponse> {
        const administrator = await this.administratorService.getByUsername(data.username);

        if (!administrator) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3001)));
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if (administrator.passwordHash !== passwordHashString) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
        }

        const jwtData = new JwtDataDto();
        jwtData.role = "administrator";
        jwtData.id = administrator.administratorId;
        jwtData.identity = administrator.username;

        jwtData.exp = this.getDatePlus(60 * 60 * 24 * 14);

        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];

        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        const responseObject = new LoginInfoDto(
            administrator.administratorId,
            administrator.username,
            token,
            "",
            "",
        );

        return new Promise(resolve => resolve(responseObject));
    }

    @Post('user/register') 
    async userRegister(@Body() data: UserRegistrationDto) {
        return await this.userService.register(data);
    }

    @Post('user/login')
    async doUserLogin(@Body() data: LoginUserDto, @Req() req: Request): Promise<LoginInfoDto | ApiResponse> {
        const user = await this.userService.getByEmail(data.email);

        if (!user) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3001)));
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if (user.passwordHash !== passwordHashString) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
        }

      

    }



    private getDatePlus(numberOfSeconds: number): number {
        return new Date().getTime() / 1000 + numberOfSeconds;
    }

    private getIsoDate(timestamp: number): string {
        const date = new Date();
        date.setTime(timestamp * 1000);
        return date.toISOString();
    }

    private getDatabseDateFormat(isoFormat: string): string {
        return isoFormat.substr(0, 19).replace('T', ' ');
    }
}
