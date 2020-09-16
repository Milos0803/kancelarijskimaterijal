import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Observable } from 'rxjs';
import { Request } from "express";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleCheckerGuard implements CanActivate {
    constructor(private reflector: Reflector) {

    }


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const req: any = context.switchToHttp().getRequest();
       const role =  req.token ? req.token.role : "guest";

        const allowedToRoles = this
            .reflector.
            get<("administrator" | "user" | "guest")[]>('allow_to_roles', context.getHandler());
        if(!allowedToRoles.includes(role)){
            return false ;
        }
        return true;

    }



}