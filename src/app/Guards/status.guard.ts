import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class StatusGuard implements CanActivate {
  status!: number;
  role!: number;

  constructor(private usuarioService: UserService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Promise<boolean | UrlTree>
  {
    const data: any = await this.usuarioService.verifiyToken().toPromise();
    this.status = data.user_estatus;
    this.role = data.user_rol;

    if (this.status == 0) 
    {
      alert("Tu cuenta no ha sido activada, completa el proceso de activación para poder ingresar.");
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      this.router.navigate(['/activacion']);
      return false;
    }

    else if (this.status == 1) 
    {
      alert("Tu cuenta ha sido desactivada, contacta con el administrador.");
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      this.router.navigate(['/solicitud']);
      return false;
    } 

    else if (this.status == 2) 
    {
      if (this.role == 1 || this.role == 2)
      {
        location.assign('/usuarios');
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
    }
  }
}
