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

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

  tiendas: Tienda[] = [];
  owners: TiendaUser[] = [];
  invitados: TiendaUser[] = [];
  users: User[] = [];
  usersFaltantes: User[] = [];

  usuariosSeleccionados: number[] = [];
  sensoresSeleccionados: number[] = [];
  
  formTienda: FormGroup;
  formSensores: FormGroup;
  formEliminarUsuarios: FormGroup;

  formAgregarInvitado: FormGroup;
  invitado_id: number = 0;

  formModificarTienda: FormGroup;

  tiendaActual: number = 0;

  constructor(private usersInvitacionesService: UsersTiendasService, private tiendasService: TiendasService, private adminService: AdminService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private dialog: MatDialog)
  {
    this.formTienda = this.fb.group({
      nombre:  ['', [Validators.required, Validators.minLength(5)]],
      user_id:  ['', [Validators.required]]
    });

    this.formSensores = this.fb.group({
    });

    this.formEliminarUsuarios = this.fb.group({
    });

    this.formAgregarInvitado = this.fb.group({
      user_id:  ['', [Validators.required]]
    });

    this.formModificarTienda = this.fb.group({
      nombre:  ['', [Validators.required, Validators.minLength(5)]],
      user_id:  ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getTiendas();
    this.getOwners();
    this.getUsers();
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

  getFaltantes(id: number)
  {
    this.tiendaActual = id;

    this.tiendasService.getFaltantes(id).subscribe(
      data => {
        this.usersFaltantes = data;
      }
    );
  }

  getInvitados(id_tienda: number)
  {
    console.log(id_tienda);

    this.usersInvitacionesService.getInvitados(id_tienda).subscribe(
      data => {
        this.invitados = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getInfoOwnersTienda(tienda_id: number)
  {
    const owner = this.owners.find(owner => owner.tienda_id === tienda_id);
    console.log(owner);

    const user = this.users.find(user => user.id === owner?.user_id);
    console.log(user);

    return user ? user.correo : "";
  }

  getInfoInvitadosTienda(user_id: number)
  {
    const invitado = this.invitados.find(invitado => invitado.user_id === user_id);

    const user = this.users.find(user => user.id === invitado?.user_id);

    return user ? user.correo : "";
  }

  guardarEnArregloEliminar(id: number)
  {
    if (!this.usuariosSeleccionados.includes(id)) 
    {
      this.usuariosSeleccionados.push(id);
    }

    else 
    {
        const index = this.usuariosSeleccionados.indexOf(id);
        this.usuariosSeleccionados.splice(index, 1);
    }
  }

  addInvitado(id: number, tienda_user: TiendaUser)
  {
    tienda_user.tienda_id = id;

    console.log(tienda_user);

    this.usersInvitacionesService.addInvitado(tienda_user).subscribe(
      response => {
        location.reload();
      },
      error => {
        alert("Error al agregar los usuarios");
      }
    );
  }

  deleteInvitados(id: number)
  {
    this.usersInvitacionesService.deleteInvitados(id, this.usuariosSeleccionados).subscribe(
      response => {
        location.reload();
      },
      error => {
        alert("Error al eliminar los usuarios");
      }
    );
  }

  //Gestion de Tiendas
  getTienda(id: number)
  {
    this.tiendaActual = id;

    this.tiendasService.getTienda(id).subscribe(
      data => {
        this.formModificarTienda.patchValue(data);
      }
    );
  }

  addTienda(tienda: Tienda)
  {
    this.tiendasService.addTienda(tienda).subscribe(
      response => {
        location.reload();
      },
      error => {
        console.log(error);
        alert("Error al agregar la tienda");
      }
    );
  }

  updateTienda(id: number,  tienda: Tienda)
  {
    this.tiendasService.updateTienda(id, tienda).subscribe(
      response => {
        location.reload();
      }
    );
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
