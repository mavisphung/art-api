import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtModuleOptions, JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { AppError, ERROR_CODE } from "src/shared/error";
import { Role } from "src/shared/roles/role.enum";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") { }

export class CustomAuthGuard implements CanActivate {

  private jwtService: JwtService;

  constructor(private readonly reflector: Reflector) {
    const options: JwtModuleOptions = {
      secret: process.env.SECRET_KEY
    }
    this.jwtService = new JwtService(options);
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log("AuthGuard.canActivate(context) invoked");

    //----------------------GET ROLES----------------------
    // determine who is allowed to continue, base on role code
    // get role codes from decorator of controller method
    const allowedRoles = this.reflector.get<string[]>("roles", context.getHandler());
    console.log("Roles: ", allowedRoles);

    // nothing means public
    if (!allowedRoles || !allowedRoles.length) {
      console.log("Not authorized yet");
      return true;
    }
    const isPublic = this.reflector.get<boolean>("isPublic", context.getHandler());
    console.log('This is public? ' + isPublic ? true : false);
    if (isPublic) {
      console.log("Public route");
      return true;
    }

    const request = context.switchToHttp().getRequest();

    //if there is no authorization in header, refuse the request
    if (!request.headers.authorization) throw new AppError(ERROR_CODE.UNAUTHORIZED, "Invalid user");

    // console.log("Token here", request.headers);
    const token = request.headers.authorization.split(" ")[1];
    let decodedToken = null;
    try {
      decodedToken = this.jwtService.decode(token) as {
        [key: string]: any
      };
    } catch (err) {
      throw new AppError(ERROR_CODE.UNAUTHORIZED, 'Invalid token');
    }
    console.log("decoded here", decodedToken);

    const roleInToken = decodedToken.roles; //array
    console.log("Get role in token: ", roleInToken);
    const isMatched = allowedRoles.includes(roleInToken[0]);

    request.user = decodedToken;

    return isMatched;
  }
}