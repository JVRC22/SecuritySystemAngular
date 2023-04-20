import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { PeticionesService } from 'src/app/Services/peticiones.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  numPeticiones: number = 0;

  constructor(private loginService: LoginService, private peticionesService: PeticionesService, private router: Router) { }

  ngOnInit(): void {
    this.getPeticiones();
  }

  cambiarModo()
  {}

  logout()
  {
    if(confirm('¿Seguro que desea cerrar sesión?'))
    {
      this.loginService.logout().subscribe(response => {
        localStorage.clear();
        location.assign('/welcome');
      },
      error => {
        console.log(error);
      });
    }
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

  getPeticiones()
  {
    this.peticionesService.getPeticiones().subscribe(
      response => {
        this.numPeticiones = response.length;
      }
    );
  }
}
