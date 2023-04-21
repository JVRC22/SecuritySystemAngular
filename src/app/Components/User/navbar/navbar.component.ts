import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private loginService: LoginService) { }

  username: string = localStorage.getItem('username') || '';
  correo: string = localStorage.getItem('email') || '';
  role: number = Number(localStorage.getItem('role')) || 0;

  getData()
  {
    this.username = localStorage.getItem('username') || '';
    this.correo = localStorage.getItem('email') || '';
    this.role = Number(localStorage.getItem('role')) || 0;
  }

  isSessionActive() 
  {
    this.getData()
    return !!localStorage.getItem('token');
  }

  usuarios()
  {
    location.assign('/usuarios');
  }

  moderadores()
  {
    location.assign('/moderadores');
  }

  tiendas()
  {
    location.assign('/tiendas');
  }

  peticiones()
  {
    location.assign('/peticiones');
  }

  login()
  {
    this.router.navigate(['/login']);
  }

  logout()
  {
    //if(confirm('¿Seguro que desea cerrar sesión?'))
    //{
      this.loginService.logout().subscribe(response => {
        localStorage.clear();
        location.assign('/');
      });
    //}
  }

  redirigir()
  {
    if(this.role == 1 || this.role == 2)
    {
      location.assign('/usuarios');
    }

    else if(this.role == 3)
    {
      this.router.navigate(['/home']);
    }

    else{
      this.router.navigate(['/login']);
    }
  }
}
