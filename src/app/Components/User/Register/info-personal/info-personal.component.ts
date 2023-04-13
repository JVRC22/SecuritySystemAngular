import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { InfoUsuario } from 'src/app/Interfaces/info-usuario';
import { User } from 'src/app/Interfaces/user';
import { InfoRegistroService } from 'src/app/Services/info-registro.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.component.html',
  styleUrls: ['./info-personal.component.css']
})
export class InfoPersonalComponent implements OnInit {

  form: FormGroup;
  info!: User;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private loginService: LoginService, private infoRegistroService: InfoRegistroService) 
  {
    this.form = this.fb.group({
      nombre:  ['', [Validators.required, Validators.minLength(3)]],
      ap_paterno:  ['', [Validators.required, Validators.minLength(3)]],
      ap_materno:  ['', [Validators.required, Validators.minLength(3)]],
      sexo:  ['', [Validators.required]],
      fecha_nacimiento:  ['', [Validators.required]],
    });
  }

  guardarInfoPersonal(info_usuario: InfoUsuario)
  {
    this.infoRegistroService.nombre = info_usuario.nombre;
    this.infoRegistroService.ap_paterno = info_usuario.ap_paterno;
    this.infoRegistroService.ap_materno = info_usuario.ap_materno;
    this.infoRegistroService.sexo = info_usuario.sexo;
    this.infoRegistroService.fecha_nacimiento = info_usuario.fecha_nacimiento;
    this.router.navigate(['/password']);
  }

  ngOnInit(): void { }
}
