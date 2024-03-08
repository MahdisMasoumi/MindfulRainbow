import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { UsersService } from "./services/users.service";

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const userService = inject(UsersService);
  const token = userService.getToken();
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        authorization: token,
      },
    });
    return next(cloned);
  } else {
    return next(req);
  }
};