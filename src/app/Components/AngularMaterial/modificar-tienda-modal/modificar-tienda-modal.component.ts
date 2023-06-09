import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client';
import { Tienda } from 'src/app/Interfaces/tienda';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';
import { TiendasService } from 'src/app/Services/tiendas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modificar-tienda-modal',
  templateUrl: './modificar-tienda-modal.component.html',
  styleUrls: ['./modificar-tienda-modal.component.css']
})
export class ModificarTiendaModalComponent implements OnInit {

  public socket = io(environment.urlapi);

  formModificarTienda: FormGroup;

  users: User[] = [];
  tienda!: Tienda;

  apiFailed: boolean = false;
  invalido: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private tiendasService: TiendasService, private adminService: AdminService, private dialogRef: MatDialogRef<ModificarTiendaModalComponent>, @Inject(MAT_DIALOG_DATA) private data: { id: number })
  {
    this.formModificarTienda = this.fb.group({
      nombre:  ['', [Validators.required, Validators.minLength(5)]],
      user_id:  ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.getTienda();

    this.socket.on('usuario', (data: any) => {
      this.getUsers();
    });
  }

  getUsers()
  {
    this.adminService.getUsuariosNormales().subscribe(
      data => {
        this.users = data;
      }
    );
  }

  getTienda()
  {
    this.tiendasService.getTienda(this.data.id).subscribe(
      data => {
        this.tienda = data;
        this.formModificarTienda.patchValue(this.tienda);
      }
    );
  }

  updateTienda(tienda: Tienda)
  {
    this.tiendasService.updateTienda(this.data.id, tienda).subscribe(
      response => {
        this.dialogRef.close();
      },
      error => {
        this.invalido = true;
        this.apiFailed = true;
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