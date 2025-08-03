import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { routes } from '../../../app/app.routes';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const platformId = inject(PLATFORM_ID)
  if(isPlatformBrowser(platformId))
  {
    if (localStorage.getItem("myToken") !== null)
    {
      return true;
    }
  }

    router.navigate(['/login'])
    return false;
  

};
