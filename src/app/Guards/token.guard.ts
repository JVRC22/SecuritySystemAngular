import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  status!: number;
  role!: number;

  constructor(private usuarioService: UserService,private router:Router) { }

  async canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Promise<boolean | UrlTree>
  {
    try
    {
      await this.usuarioService.verifiyToken().toPromise();
      return true;
    }

    catch(error)
    {
      console.log(error);
      alert("Tienes que iniciar sesión."); 
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
