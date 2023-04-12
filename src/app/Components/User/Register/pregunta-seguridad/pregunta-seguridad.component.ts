import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pregunta } from 'src/app/Interfaces/pregunta';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-pregunta-seguridad',
  templateUrl: './pregunta-seguridad.component.html',
  styleUrls: ['./pregunta-seguridad.component.css']
})
export class PreguntaSeguridadComponent {

  form: FormGroup;
  preguntas: Pregunta[] = [];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private loginService: LoginService) 
  {
    this.form = this.fb.group({
      pregunta_id:  ['', [Validators.required]],
      respuesta:  ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getPreguntas();
  }

  getPreguntas()
  {
    this.loginService.verPreguntas().subscribe(
      data => {
        this.preguntas = data;
      }
    );
  }
}
