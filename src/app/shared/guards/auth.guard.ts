import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/http/auth/auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authSvc: AuthService = inject(AuthService)
    const router: Router = inject(Router);

    if (authSvc.userValue){
      return true;
    }

    router.navigate(['']);
    return false
};
