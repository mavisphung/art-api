import { SetMetadata } from "@nestjs/common";
import { Role } from "./role.enum";

export const AllowedRoles = (...roles: string[]) => SetMetadata("roles", roles);