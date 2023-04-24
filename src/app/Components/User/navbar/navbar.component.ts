import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { LoginService } from 'src/app/Services/login.service';
import { PeticionesService } from 'src/app/Services/peticiones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private peticionesService: PeticionesService) { }

  public socket = io(environment.urlapi);

  username: string = localStorage.getItem('username') || '';
  correo: string = localStorage.getItem('email') || '';
  role: number = Number(localStorage.getItem('role')) || 0;

  numPeticiones: number = 0;

  ngOnInit(): void {
    this.getPeticiones();

    this.socket.on('peticion', (data: any) => {
      this.getPeticiones();
    });
  }

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
    this.router.navigate(['/usuarios']);
  }

  moderadores()
  {
    this.router.navigate(['/moderadores']);
  }

  tiendas()
  {
    this.router.navigate(['/tiendas']);
  }

  peticiones()
  {
    this.router.navigate(['/peticiones']);
  }

  getPeticiones()
  {
    this.peticionesService.getPeticiones().subscribe(
      response => {
        console.log(response);
        this.numPeticiones = response.length;
      }
    );
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
