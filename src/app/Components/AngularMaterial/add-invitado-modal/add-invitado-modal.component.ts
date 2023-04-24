import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client';
import { TiendaUser } from 'src/app/Interfaces/tienda-user';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';
import { TiendasService } from 'src/app/Services/tiendas.service';
import { UsersTiendasService } from 'src/app/Services/users-tiendas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-invitado-modal',
  templateUrl: './add-invitado-modal.component.html',
  styleUrls: ['./add-invitado-modal.component.css']
})
export class AddInvitadoModalComponent implements OnInit {

  public socket = io(environment.urlapi);

  formAgregarInvitado: FormGroup;

  usersFaltantes: User[] = [];

  apiFailed: boolean = false;
  invalido: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private tiendasService: TiendasService, private adminService: AdminService, private usersInvitacionesService: UsersTiendasService ,private dialogRef: MatDialogRef<AddInvitadoModalComponent>, @Inject(MAT_DIALOG_DATA) private data: { id: number })
  {
    this.formAgregarInvitado = this.fb.group({
      user_id:  ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getFaltantes();

    this.socket.on('usuario', (data: any) => {
      this.getFaltantes();
    });
  }

  getFaltantes()
  {
    this.tiendasService.getFaltantes(this.data.id).subscribe(
      data => {
        this.usersFaltantes = data;
      }
    );
  }

  addInvitado(tienda_user: TiendaUser)
  {
    tienda_user.tienda_id = this.data.id;

    this.usersInvitacionesService.addInvitado(tienda_user).subscribe(
      response => {
        this.dialogRef.close();
      },
      error => {
        this.apiFailed = true;
        this.invalido = true;
      }
    );
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