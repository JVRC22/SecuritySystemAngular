import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoUsuario } from 'src/app/Interfaces/info-usuario';
import { User } from 'src/app/Interfaces/user';
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

  invalido1:boolean = false;
  invalido2:boolean = false;
  invalido3:boolean = false;

  apiFailed1:boolean = false;
  apiFailed2:boolean = false;
  apiFailed3:boolean = false;

  api: boolean = false;
  pass: boolean = false;

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
    this.getMyInfoCuenta();
    this.getMyInfoPersonal();
  }

  getMyInfoCuenta()
  {
    this.usersService.getMyInfoUsuario().subscribe(
      data => {
        this.formInfoCuenta.patchValue(data);
      }
    );
  }

  updateMyInfoCuenta(user: User)
  {
    this.usersService.updateMyUser(user).subscribe(
      data => {
        location.reload();
      },
      error => {
        this.invalido2 = true;
        this.apiFailed2 = true;
      }
    );
  }

  getMyInfoPersonal()
  {
    this.usersService.getMyInfoPersonal().subscribe(
      data => {
        this.formInfoUsuario.patchValue(data);
      }
    );
  }

  updateMyInfoPersonal(info_usuario: InfoUsuario)
  {
    this.usersService.updateMyInfoPersonal(info_usuario).subscribe(
      data => {
        location.reload();
      },
      error => {
        this.invalido1 = true;
        this.apiFailed1 = true;
      }
    );
  }

  updateMyPassword(user: User)
  {
    if (this.formCambiarPassword.value.new_password == this.formCambiarPassword.value.repeat_new_password)
    {
      this.usersService.updateMyPassword(user).subscribe(
        data => {
          location.reload();
        },
        error => {
          this.api = true;
          this.invalido3 = true;
          this.apiFailed3 = true;
        }
      );
    }

    else
    {
      this.pass = true;
      this.invalido3 = true;
      this.apiFailed3 = true;
    }
  }

  onAnimationEnd()
  {
    this.apiFailed1 = false;
    this.apiFailed2 = false;
    this.apiFailed3 = false;
  }
}
