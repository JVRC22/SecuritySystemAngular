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
      /*this.status = data.user_estatus;
      this.role = data.user_rol;

      if (this.status == 0) 
      {
        alert("Tu cuenta no ha sido activada, completa el proceso de activación para poder ingresar.");
        localStorage.clear();
        this.router.navigate(['/activacion']);
        return false;
      }

      else if (this.status == 1) 
      {
        alert("Tu cuenta está desactivada, contacta con el administrador.");
        localStorage.clear();
        this.router.navigate(['/recuperacion']);
        return false;
      } 

      else if (this.status == 2) 
      {
        if (this.role == 1 || this.role == 2)
        {
          //location.assign('/usuarios');
          this.router.navigate(['/usuarios']);
        }

        else if (this.role == 3)
        {
          this.router.navigate(['/home']);
        }
        
        return false;
      } 

      else 
      {
        return true;
      }*/
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
