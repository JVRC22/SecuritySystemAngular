import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoUsuario } from 'src/app/Interfaces/info-usuario';
import { AdminService } from 'src/app/Services/admin.service';
import { ModificarInfoUsuarioDrawerComponent } from '../modificar-info-usuario-drawer/modificar-info-usuario-drawer.component';

@Component({
  selector: 'app-modificar-info-cuenta-drawer',
  templateUrl: './modificar-info-cuenta-drawer.component.html',
  styleUrls: ['./modificar-info-cuenta-drawer.component.css']
})
export class ModificarInfoCuentaDrawerComponent implements OnInit {

  formInfoUsuario: FormGroup;

  info_usuario!: InfoUsuario;

  apiFailed: boolean = false;
  invalido: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private adminService: AdminService, private dialogRef: MatDialogRef<ModificarInfoUsuarioDrawerComponent>, @Inject(MAT_DIALOG_DATA) private data: { id: number })
  {
    this.formInfoUsuario = this.fb.group({
      id:  ['', [Validators.required]],
      nombre:  ['', [Validators.required, Validators.minLength(3)]],
      ap_paterno:  ['', [Validators.required, Validators.minLength(3)]],
      ap_materno:  ['', [Validators.required, Validators.minLength(3)]],
      sexo:  ['', [Validators.required]],
      fecha_nacimiento:  ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getInfoUsuario(this.data.id);
  }

  getInfoUsuario(id: number)
  {
    this.adminService.getInfoUsuario(id).subscribe(
      response => {
        this.info_usuario = response;
        this.formInfoUsuario.patchValue(this.info_usuario)
      }
    );
  }

  modificarInfoUsuario(info: InfoUsuario)
  {
    this.adminService.updateInfoUsuario(info).subscribe(
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