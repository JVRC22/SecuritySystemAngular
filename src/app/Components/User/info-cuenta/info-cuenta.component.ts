import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-info-cuenta',
  templateUrl: './info-cuenta.component.html',
  styleUrls: ['./info-cuenta.component.css']
})
export class InfoCuentaComponent implements OnInit {

  formInfoCuenta: FormGroup;
  formInfoUsuario: FormGroup;
  formCambiarPassword: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private usersService: UserService)
  {
    this.formInfoCuenta = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.min(10)]],
    });

    this.formInfoUsuario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      ap_paterno: ['', [Validators.required, Validators.minLength(3)]],
      ap_materno: ['', [Validators.required, Validators.minLength(3)]],
      sexo: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.formCambiarPassword = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      new_password: ['', [Validators.required, Validators.minLength(5)]],
      repeat_new_password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {
    this.getMyInfoPersonal();
  }

  getMyInfoPersonal()
  {
    this.usersService.getMyInfoPersonal().subscribe(
      data => {
        console.log(data);
        this.formInfoUsuario.patchValue(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
