import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { PrincipalService } from '../servicios/principal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afsAuth: AngularFireAuth, private authService: AuthService, private router: Router,
              private principalService: PrincipalService) {}


  url: string;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {


       this.afsAuth.authState.subscribe(resp => {

        console.log(this.principalService.getUsuario());


        const especialidad =  this.principalService.traerEspecialidad(resp.email);

        if (state.url === '/' + especialidad) {
           this.router.navigate([state.url]);
           return true;
         } else {
            this.router.navigate(['/' + especialidad]);
            return false;
          }
       });

       this.router.navigate(['/Login']);
       return false;

}
  }

