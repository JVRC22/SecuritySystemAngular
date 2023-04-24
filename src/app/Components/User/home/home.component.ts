import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client';
import { Tienda } from 'src/app/Interfaces/tienda';
import { TiendaUser } from 'src/app/Interfaces/tienda-user';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';
import { TiendasService } from 'src/app/Services/tiendas.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';
import { InfoSensoresDrawerComponent } from '../../AngularMaterial/info-sensores-drawer/info-sensores-drawer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public socket = io(environment.urlapi);

  id: number = 0;
  tiendas: Tienda[] = [];
  users: User[] = [];
  misTiendas: TiendaUser[] = [];

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService, private tiendasService: TiendasService, private adminService: AdminService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('id') as unknown as number;
    this.getTiendas();
    this.getMisTiendas();
    this.getUsers();

    this.socket.on('tienda', (data: any) => {
      this.getTiendas();
      this.getMisTiendas();
      this.getUsers();
    });
  }

  getTiendas()
  {
    this.tiendasService.getTiendas().subscribe(
      (data) => {
        this.tiendas = data;
        console.log(this.tiendas);
      }
    );
  }

  getUsers()
  {
    this.adminService.getUsuariosNormales().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      }
    );
  }

  getTiendaNombre(tienda_id: number)
  {
    const tienda = this.tiendas.find(tienda => tienda.id === tienda_id);

    return tienda ? tienda.nombre : "";
  }

  getInfoOwnersTienda(tienda_id: number)
  {
    const owner = this.misTiendas.find(owner => owner.tienda_id === tienda_id);

    const user = this.users.find(user => user.id === owner?.user_id);

    return user ? user.correo : "";
  }

  getMisTiendas()
  {
    this.userService.misTiendasToken().subscribe(
      (data) => {
        this.misTiendas = data;
        console.log(this.misTiendas);
      }
    );
  }

  sensores(id: number)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {id: id};
    dialogConfig.enterAnimationDuration = 0;

    this.dialog.open(InfoSensoresDrawerComponent, dialogConfig);
  }
}