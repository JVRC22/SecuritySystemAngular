import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class StatusGuard implements CanActivate {
  status!: number;

  constructor(private usuarioService: UserService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Promise<boolean | UrlTree>
  {
    const data: any = await this.usuarioService.verifiyToken().toPromise();
    this.status = data.user_estatus;

    if (this.status == 0) 
    {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      this.router.navigate(['/activacion']);
      return false;
    }

    else if (this.status == 1) 
    {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      this.router.navigate(['/solicitud']);
      return false;
    } 

    else if (this.status == 2) 
    {
      return true;
    } 

    else 
    {
      return false;
    }
  }
}
