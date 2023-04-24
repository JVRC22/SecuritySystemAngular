import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';
import { DeleteModalComponent } from '../../AngularMaterial/delete-modal/delete-modal.component';
import { ModificarInfoUsuarioDrawerComponent } from '../../AngularMaterial/modificar-info-usuario-drawer/modificar-info-usuario-drawer.component';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { AddModeradorDrawerComponent } from '../../AngularMaterial/add-moderador-drawer/add-moderador-drawer.component';

@Component({
  selector: 'app-moderadores',
  templateUrl: './moderadores.component.html',
  styleUrls: ['./moderadores.component.css']
})
export class ModeradoresComponent implements OnInit {

  public socket = io(environment.urlapi);

  usuarios: User[] = [];

  constructor(private router: Router, private adminService: AdminService, private fb: FormBuilder, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsuariosModeradores();

    this.socket.on('moderador', (data: any) => {
      this.getUsuariosModeradores();
    });
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

  addUsuarioModerador()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.enterAnimationDuration = 0;

    const dialogRef = this.dialog.open(AddModeradorDrawerComponent, dialogConfig);

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
    dialogConfig.data = {accion: 2, id: id};

    const dialogRef = this.dialog.open(DeleteModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
