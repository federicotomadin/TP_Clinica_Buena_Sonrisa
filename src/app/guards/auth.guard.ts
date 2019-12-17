import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { PrincipalService } from '../servicios/principal.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afsAuth: AngularFireAuth, private authService: AuthService, private router: Router,
              private principalService: PrincipalService) {}


  url: string;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> |  boolean {

      // this.afsAuth.auth.signOut();

        if (state.url === '/Laboratorista' || state.url === '/Recepcionista' 
            || state.url === '/Medico' || state.url === '/Cliente' || state.url === '/Administrador' ) {
      
         this.afsAuth.idTokenResult.subscribe(dat => {   
           if (isNullOrUndefined(dat)) {
            this.router.navigate(['/Login']);
            return false;
           }
         })
    
          return true;
          
         } else {
          this.router.navigate(['/Login'])
         }
}
  }

