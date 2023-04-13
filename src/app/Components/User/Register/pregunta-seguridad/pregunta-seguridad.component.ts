import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoUsuario } from 'src/app/Interfaces/info-usuario';
import { Pregunta } from 'src/app/Interfaces/pregunta';
import { InfoRegistroService } from 'src/app/Services/info-registro.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-pregunta-seguridad',
  templateUrl: './pregunta-seguridad.component.html',
  styleUrls: ['./pregunta-seguridad.component.css']
})
export class PreguntaSeguridadComponent {

  form: FormGroup;
  preguntas: Pregunta[] = [];
  apiFailed: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private loginService: LoginService, private infoRegistroService: InfoRegistroService) 
  {
    this.form = this.fb.group({
      pregunta_id:  ['', [Validators.required]],
      respuesta:  ['', [Validators.required, Validators.minLength(4)]],
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

  register(info_usuario: InfoUsuario)
  {
    try
    {
      this.infoRegistroService.pregunta_id = info_usuario.pregunta_id;
      this.infoRegistroService.respuesta = info_usuario.respuesta;

      this.loginService.registerUsuario().subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          this.apiFailed = true;
        }
      );
    }

    catch(error)
    {
      console.log(error);
    }
  }

  onAnimationEnd()
  {
    this.apiFailed = false;
  }
}
