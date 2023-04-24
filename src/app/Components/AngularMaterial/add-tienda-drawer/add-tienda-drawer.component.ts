import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client';
import { Tienda } from 'src/app/Interfaces/tienda';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';
import { TiendasService } from 'src/app/Services/tiendas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-tienda-drawer',
  templateUrl: './add-tienda-drawer.component.html',
  styleUrls: ['./add-tienda-drawer.component.css']
})
export class AddTiendaDrawerComponent implements OnInit {

  public socket = io(environment.urlapi);

  formTienda: FormGroup;

  users: User[] = [];

  invalido: boolean = false;
  apiFailed: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private tiendasService: TiendasService, private adminService: AdminService, private dialogRef: MatDialogRef<AddTiendaDrawerComponent>)
  {
    this.formTienda = this.fb.group({
      nombre:  ['', [Validators.required, Validators.minLength(5)]],
      user_id:  ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getUsers();

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

  addTienda(tienda: Tienda)
  {
    this.tiendasService.addTienda(tienda).subscribe(
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