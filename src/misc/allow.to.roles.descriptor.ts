import { SetMetadata } from "@nestjs/common"

export const AllowToRoles = (...roles: ("administrator" | "user" | "guest")[]) => {
  return  SetMetadata('allow_to_roles',roles);
};