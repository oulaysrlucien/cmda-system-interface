import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const allowedRoles = route.data['roles'] as string[] | undefined;

    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    const hasAllowedRole = allowedRoles.some(role => this.authService.hasRole(role));

    if (hasAllowedRole) {
      return true;
    }

    return this.router.createUrlTree(['/']);
  }
}
