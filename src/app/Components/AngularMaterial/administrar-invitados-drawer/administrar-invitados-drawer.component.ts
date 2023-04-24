import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TiendaUser } from 'src/app/Interfaces/tienda-user';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';
import { TiendasService } from 'src/app/Services/tiendas.service';
import { UsersTiendasService } from 'src/app/Services/users-tiendas.service';

@Component({
  selector: 'app-administrar-invitados-drawer',
  templateUrl: './administrar-invitados-drawer.component.html',
  styleUrls: ['./administrar-invitados-drawer.component.css']
})
export class AdministrarInvitadosDrawerComponent implements OnInit {

  formEliminarUsuarios: FormGroup;

  users: User[] = [];
  invitados: TiendaUser[] = [];
  usuariosSeleccionados: number[] = [];

  apiFailed: boolean = false;
  invalido: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private tiendasService: TiendasService, private adminService: AdminService, private usersInvitacionesService: UsersTiendasService ,private dialogRef: MatDialogRef<AdministrarInvitadosDrawerComponent>, @Inject(MAT_DIALOG_DATA) private data: { id: number })
  {
    this.formEliminarUsuarios = this.fb.group({
    });  
  }

  ngOnInit(): void {
    this.getUsers();
    this.getInvitados();
  }

  getUsers()
  {
    this.adminService.getUsuariosNormales().subscribe(
      data => {
        this.users = data;
      }
    );
  }

  getInvitados()
  {
    this.usersInvitacionesService.getInvitados(this.data.id).subscribe(
      data => {
        this.invitados = data;
      },
      error => {
        console.log(error);
      }
    );
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

  deleteInvitados()
  {
    this.usersInvitacionesService.deleteInvitados(this.data.id, this.usuariosSeleccionados).subscribe(
      response => {
        this.dialogRef.close();
      },
      error => {
        this.apiFailed = true;
        this.invalido = true;
      }
    );
  }

  getInfoInvitadosTienda(user_id: number)
  {
    const invitado = this.invitados.find(invitado => invitado.user_id === user_id);

    const user = this.users.find(user => user.id === invitado?.user_id);

    return user ? user.correo : "";
  }

  closeDialog()
  {
    this.dialogRef.close();
  }

  onAnimationEnd()
  {
    this.apiFailed = false;
  }
}