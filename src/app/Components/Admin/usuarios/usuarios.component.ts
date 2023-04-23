import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoUsuario } from 'src/app/Interfaces/info-usuario';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';
import { DeleteModalComponent } from '../../AngularMaterial/delete-modal/delete-modal.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  formInfoUsuario: FormGroup;
  formUsuario: FormGroup;
  formPassword: FormGroup;

  usuarios: User[] = [];
  user!: User;
  info_usuario!: InfoUsuario;

  constructor(private router: Router, private adminService: AdminService, private fb: FormBuilder, private route: ActivatedRoute, private dialog: MatDialog) 
  {
    this.formInfoUsuario = this.fb.group({
      id:  ['', [Validators.required]],
      nombre:  ['', [Validators.required, Validators.minLength(3)]],
      ap_paterno:  ['', [Validators.required, Validators.minLength(3)]],
      ap_materno:  ['', [Validators.required, Validators.minLength(3)]],
      sexo:  ['', [Validators.required]],
      fecha_nacimiento:  ['', [Validators.required]],
    });

    this.formUsuario = this.fb.group({
      username:  ['', [Validators.required, Validators.minLength(5)]],
      estatus:  ['', [Validators.required]],
    });

    this.formPassword = this.fb.group({
      password:  ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.getUsuariosNormales();
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

  getUsuariosNormales()
  {
    this.adminService.getUsuariosNormales().subscribe(
      response => {
        this.usuarios = response;
      }
    );
  }

  getInfoUsuario(id: number)
  {
    this.adminService.getInfoUsuario(id).subscribe(
      response => {
        this.info_usuario = response;
        this.formInfoUsuario.patchValue(this.info_usuario)
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

  modificarInfoUsuario(info: InfoUsuario)
  {
    this.adminService.updateInfoUsuario(info).subscribe(
      response => {
        location.reload();
      },
      error => {
        alert("Error al modificar la información del usuario");
      }
    );
  }

  deleteUsuario(id: number)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {accion: 1, id: id};

    const dialogRef = this.dialog.open(DeleteModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}