import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { PrincipalService } from '../servicios/principal.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class RecepcionistaGuardGuard implements CanActivate {

  constructor(private afsAuth: AngularFireAuth, private authService: AuthService, private router: Router,
              private principalService: PrincipalService) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> |  boolean {

      // this.afsAuth.auth.signOut();

      if (state.url === '/Laboratorista' || state.url === '/Recepcionista'
            || state.url === '/Turno'
            || state.url === '/Historia' ||  state.url === '/Clinica'
            || state.url === '/Calendario' ) {

         this.afsAuth.idTokenResult.subscribe(dat => {
           if (isNullOrUndefined(dat)) {
            this.router.navigate(['/Login']);
            return false;
           }
         });

         return true;

         } else {
          this.router.navigate(['/Login']);
         }
}
}
