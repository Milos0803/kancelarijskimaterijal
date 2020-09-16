export class JwtRefreshDataDto{
    role: "administrator";
    id: number;
    identity: string;
    exp: number ;
    ip: string;
    ua: string;

    toPlainObject() {
        return {
            role: this.role,
            Id: this.id,
            identity: this.identity,
            ext: this.exp,
            ip: this.ip,
            ua: this.ua
        }
    }
}