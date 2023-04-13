import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoUsuario } from 'src/app/Interfaces/info-usuario';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: User[] = [];
  info_usuario!: InfoUsuario;

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getUsuariosNormales();
  }

  getUsuariosNormales()
  {
    this.adminService.getUsuariosNormales().subscribe(
      response => {
        console.log(response);
        this.usuarios = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getInfoUsuario()
  {
    this.adminService.getInfoUsuario().subscribe(
      response => {
        console.log(response);
        this.info_usuario = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}