import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Peticion } from 'src/app/Interfaces/peticion';
import { PeticionesService } from 'src/app/Services/peticiones.service';

@Component({
  selector: 'app-solicitud-admin',
  templateUrl: './solicitud-admin.component.html',
  styleUrls: ['./solicitud-admin.component.css']
})
export class SolicitudAdminComponent implements OnInit {

  id: number = 0;
  username: string = '';
  fecha!: Date;

  form: FormGroup;

  invalido: boolean = false;
  apiFailed: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private peticionesService: PeticionesService)
  {
    this.form = this.fb.group({
      user_id: null,
      mensaje:  ['', [Validators.required, Validators.minLength(5)]],
      fecha: null,
    });
  }

  ngOnInit(): void {
    alert("Tu cuenta ha sido desactivada, contacta con el administrador.");
    this.id = Number(localStorage.getItem('id'));
    this.username = String(localStorage.getItem('username'));
    this.fecha = new Date();
    this.setValues();
  } 

  setValues(): void {
    this.form.get('user_id')?.setValue(this.id);
    this.form.get('fecha')?.setValue(this.fecha);
  }

  onSubmit(peticion: Peticion): void {
    this.peticionesService.addPeticion(peticion).subscribe(
      data => {
        localStorage.clear();
        this.router.navigate(['/']);
      },
      error => {
        this.invalido = true;
        this.apiFailed = true;
      }
    );
  }

  onAnimationEnd()
  {
    this.apiFailed = false;
  }
}
