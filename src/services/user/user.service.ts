import { Injectable, NotAcceptableException } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRegistrationDto } from "src/dtos/user/user.register.dto";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from 'crypto';
import { UserToken } from "src/entities/user.token.entity";

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User) private readonly user: Repository<User>,
        @InjectRepository(UserToken) private readonly userToken: Repository<UserToken>,
    ) {
        super(user);
    }

    async register(data: UserRegistrationDto): Promise<User | ApiResponse> {
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        const newUser: User = new User();
        newUser.email         = data.email;
        newUser.passwordHash  = passwordHashString;
        newUser.forename      = data.forename;
        newUser.surname       = data.surname;
        newUser.postalAddress = data.postalAddress;

        try {
            const savedUser = await this.user.save(newUser);

            if (!savedUser) {
                throw new Error('');
            }

            return savedUser;
        } catch (e) {
            return new ApiResponse('error', -6001, 'This user account cannot be created.');
        }
    }

    async getById(id) {
        return await this.user.findOne(id);
    }

    async getByEmail(email: string): Promise<User | null> {
        const user = await this.user.findOne({
            email: email
        });

        if (user) {
            return user;
        }

        return null;
    }

    async addToken(userId: number, token: string, expiresAt: string) {
        const userToken = new UserToken();
        userToken.userId = userId;
        userToken.token = token;
        userToken.expiresAt = expiresAt;

        return await this.userToken.save(userToken);
    }

}
