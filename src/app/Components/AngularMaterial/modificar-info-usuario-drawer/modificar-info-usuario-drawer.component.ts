import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-modificar-info-usuario-drawer',
  templateUrl: './modificar-info-usuario-drawer.component.html',
  styleUrls: ['./modificar-info-usuario-drawer.component.css']
})
export class ModificarInfoUsuarioDrawerComponent implements OnInit {

  formUsuario: FormGroup;
  formPassword: FormGroup;

  user!: User;

  apiFailed: boolean = false;
  invalido: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private adminService: AdminService, private dialogRef: MatDialogRef<ModificarInfoUsuarioDrawerComponent>, @Inject(MAT_DIALOG_DATA) private data: { id: number })
  {
    this.formUsuario = this.fb.group({
      username:  ['', [Validators.required, Validators.minLength(5)]],
      estatus:  ['', [Validators.required]],
    });

    this.formPassword = this.fb.group({
      password:  ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.getUsuarioUnico();
  }

  getUsuarioUnico()
  {
    this.adminService.getUsuarioUnico(this.data.id).subscribe(
      response => {
        this.user = response;
        this.formUsuario.patchValue(this.user);
      }
    );
  }

  modificarUsuario(user: User)
  {
    this.adminService.updateUsuario(this.data.id, user).subscribe(
      response => {
        this.dialogRef.close();
      },
      error => {
        this.invalido = true;
        this.apiFailed = true;
      }
    );
  }

  modificarUsuarioPassword(user: User)
  {
    this.adminService.updateUsuarioPassword(this.data.id, user).subscribe(
      response => {
        this.dialogRef.close();
      },
      error => {
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