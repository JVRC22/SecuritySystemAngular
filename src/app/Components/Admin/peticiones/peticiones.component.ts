import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client';
import { Peticion } from 'src/app/Interfaces/peticion';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';
import { PeticionesService } from 'src/app/Services/peticiones.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.css']
})
export class PeticionesComponent implements OnInit {

  public socket = io(environment.urlapi);

  peticiones: Peticion[] = [];
  usuarios: User[] = [];

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private peticionesService: PeticionesService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getPeticiones();
    this.getUsuarios();

    this.socket.on('peticion', (data: any) => {
      this.getPeticiones();
    });
  }

  getPeticiones()
  {
    this.peticionesService.getPeticiones().subscribe(
      response => {
        this.peticiones = response;
      }
    );
  }

  getUsuarios()
  {
    this.adminService.getUsuariosNormales().subscribe(
      response => {
        this.usuarios = response;
      }
    );
  }

  aceptarPeticion(id: number)
  {
    const peticion = {estado: true}

    this.peticionesService.updateStatusPeticion(id, peticion).subscribe(
      response => {
      },
      error => {
        console.log(error);
      }
    );
  }

  denegarPeticion(id: number)
  {
    const peticion = {estado: false}

    this.peticionesService.updateStatusPeticion(id, peticion).subscribe(
      response => {
      },
      error => {
        console.log(error);
      }
    );
  }

  getUsuarioUsername(userId: number): string
  {
    const usuario = this.usuarios.find(user => user.id === userId);
    return usuario ? usuario.username : '';
  }

  getUsuarioCorreo(userId: number): string
  {
    const usuario = this.usuarios.find(user => user.id === userId);
    return usuario ? usuario.correo : '';
  }

  getUsuarioTelefono(userId: number): number
  {
    const usuario = this.usuarios.find(user => user.id === userId);
    return usuario ? usuario.telefono : 0;
  }
}
