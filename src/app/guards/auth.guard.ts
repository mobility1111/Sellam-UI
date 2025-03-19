import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userDetails = authService.isLoggedIn();
  if (!userDetails) {
    authService.clearSession();
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  
  return true;
};
