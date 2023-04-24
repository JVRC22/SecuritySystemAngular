import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Tienda } from 'src/app/Interfaces/tienda';
import { TiendaUser } from 'src/app/Interfaces/tienda-user';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';
import { TiendasService } from 'src/app/Services/tiendas.service';
import { UsersTiendasService } from 'src/app/Services/users-tiendas.service';
import { DeleteModalComponent } from '../../AngularMaterial/delete-modal/delete-modal.component';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { AddTiendaDrawerComponent } from '../../AngularMaterial/add-tienda-drawer/add-tienda-drawer.component';
import { ModificarTiendaModalComponent } from '../../AngularMaterial/modificar-tienda-modal/modificar-tienda-modal.component';
import { AddInvitadoModalComponent } from '../../AngularMaterial/add-invitado-modal/add-invitado-modal.component';
import { AdministrarInvitadosDrawerComponent } from '../../AngularMaterial/administrar-invitados-drawer/administrar-invitados-drawer.component';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

  public socket = io(environment.urlapi);

  tiendas: Tienda[] = [];
  owners: TiendaUser[] = [];
  users: User[] = [];

  sensoresSeleccionados: number[] = [];

  formSensores: FormGroup;

  constructor(private usersInvitacionesService: UsersTiendasService, private tiendasService: TiendasService, private adminService: AdminService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private dialog: MatDialog)
  {
    this.formSensores = this.fb.group({
    });  
  }

  ngOnInit(): void {
    this.getTiendas();
    this.getOwners();
    this.getUsers();

    this.socket.on('tienda', (data: any) => {
      this.getTiendas();
      this.getOwners();
      this.getUsers();
    });
  }

  getTiendas()
  {
    this.tiendasService.getTiendas().subscribe(
      data => {
        console.log(data);
        this.tiendas = data;
      }
    );
  }

  getOwners()
  {
    this.usersInvitacionesService.getOwners().subscribe(
      data => {
        this.owners = data;
      }
    );
  }

  getUsers()
  {
    this.adminService.getUsuariosNormales().subscribe(
      data => {
        this.users = data;
      }
    );
  }

  getInfoOwnersTienda(tienda_id: number)
  {

    const owner = this.owners.find(owner => owner.tienda_id === tienda_id);
    console.log(owner);

    const user = this.users.find(user => user.id === owner?.user_id);

    return user ? user.correo : "";
  }

  //Gestion de Invitados
  administrarInvitados(id: number)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {id: id};
    dialogConfig.enterAnimationDuration = 0;

    const dialogRef = this.dialog.open(AdministrarInvitadosDrawerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addInvitado(id: number)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {id: id};
    
    const dialogRef = this.dialog.open(AddInvitadoModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  //Gestion de Tiendas
  addTienda()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.enterAnimationDuration = 0;

    const dialogRef = this.dialog.open(AddTiendaDrawerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  updateTienda(id: number)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {id: id};

    const dialogRef = this.dialog.open(ModificarTiendaModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deleteTienda(id: number)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {accion: 3, id: id};

    const dialogRef = this.dialog.open(DeleteModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
