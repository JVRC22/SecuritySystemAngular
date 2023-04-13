import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-moderadores',
  templateUrl: './moderadores.component.html',
  styleUrls: ['./moderadores.component.css']
})
export class ModeradoresComponent implements OnInit {

  formUsuario: FormGroup;
  formPassword: FormGroup;

  usuarios: User[] = [];
  user!: User;

  constructor(private router: Router, private adminService: AdminService, private fb: FormBuilder, private route: ActivatedRoute) 
  {
    this.formUsuario = this.fb.group({
      username:  ['', [Validators.required, Validators.minLength(5)]],
      estatus:  ['', [Validators.required]],
    });

    this.formPassword = this.fb.group({
      password:  ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.getUsuariosModeradores();
  }

  getUsuarioUnico(id: number)
  {
    this.adminService.getUsuarioUnico(id).subscribe(
      response => {
        this.user = response;
        this.formUsuario.patchValue(this.user);
      }
    );
  }

  getUsuariosModeradores()
  {
    this.adminService.getUsuariosModeradores().subscribe(
      data => {
        this.usuarios = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  modificarUsuario(id: number, user: User)
  {
    this.adminService.updateUsuario(id, user).subscribe(
      response => {
        location.reload();
      },
      error => {
        alert("Error al modificar el usuario");
      }
    );
  }

  modificarUsuarioPassword(id: number, user: User)
  {
    this.adminService.updateUsuarioPassword(id, user).subscribe(
      response => {
        location.reload();
      },
      error => {
        alert("Error al modificar la contraseña del usuario");
      }
    );
  }

  deleteUsuario(id: number)
  {
    this.adminService.deleteUsuarioModerador(id).subscribe(
      response => {
        location.reload();
      }
    );
  }
}
