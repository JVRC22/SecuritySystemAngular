import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoUsuario } from 'src/app/Interfaces/info-usuario';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';
import { DeleteModalComponent } from '../../AngularMaterial/delete-modal/delete-modal.component';
import { ModificarInfoUsuarioDrawerComponent } from '../../AngularMaterial/modificar-info-usuario-drawer/modificar-info-usuario-drawer.component';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { ModificarInfoCuentaDrawerComponent } from '../../AngularMaterial/modificar-info-cuenta-drawer/modificar-info-cuenta-drawer.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public socket = io(environment.urlapi);

  usuarios: User[] = [];

  constructor(private router: Router, private adminService: AdminService, private fb: FormBuilder, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsuariosNormales();

    this.socket.on('usuario', (data: any) => {
      this.getUsuariosNormales();
    });
  }

  getUsuariosNormales()
  {
    this.adminService.getUsuariosNormales().subscribe(
      response => {
        this.usuarios = response;
      }
    );
  }

  modificarInfoUsuario(id: number)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {id: id};
    dialogConfig.enterAnimationDuration = 0;

    const dialogRef = this.dialog.open(ModificarInfoCuentaDrawerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  modificarUsuario(id: number)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {id: id};
    dialogConfig.enterAnimationDuration = 0;

    const dialogRef = this.dialog.open(ModificarInfoUsuarioDrawerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
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