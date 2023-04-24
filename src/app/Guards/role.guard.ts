import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  rol?:number;

  constructor(private router:Router, private userService: UserService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> 
  {
    const roles = route.data['expectedRole'];
    let rol = this.rol;

    try 
    {
      const data: any = await this.userService.verifiyToken().toPromise();
      rol = data.user_rol;
  
      if(rol)
      {
        for (let i = 0; i < roles.length; i++) 
        {
          if (roles[i] == rol) {
            return true;
          }
        }

        alert("No tienes permisos para acceder a esta pagina");
        this.router.navigate(['/login']);
        return false;
      } 
      
      else 
      {
        return false;
      }
    } 

    catch(error) 
    {
      alert("No tienes permisos para acceder a esta pagina");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
