import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoUsuario } from 'src/app/Interfaces/info-usuario';
import { User } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.component.html',
  styleUrls: ['./recuperacion.component.css']
})
export class RecuperacionComponent implements OnInit {

  formCode1: FormGroup;
  formCode2: FormGroup;
  formRespuesta: FormGroup;

  apiFailed: boolean = false;
  invalido: boolean = false;

  enviado1: boolean = false;
  enviado2: boolean = false;
  
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute)
  {
    this.formCode1 = this.fb.group({
      codigo_verificacion: ['', [Validators.required]],
    });

    this.formCode2 = this.fb.group({
      codigo_verificacion: ['', [Validators.required]],
    });

    this.formRespuesta = this.fb.group({
      respuesta: ['', [Validators.required]],
    });
  }
  
  ngOnInit(): void {
  }

  enviarCodigo1()
  {
    this.enviado1 = true;
  }

  enviarCodigo2()
  {
    this.enviado2 = true;
  }

  getPregunta()
  {}

  onSubmitCode(user: User)
  {
    this.router.navigate(['/cambiar_password']);
  }

  onSubmitRespuesta(infoUser: InfoUsuario)
  {
    this.router.navigate(['/cambiar_password']);
  }

  onAnimationEnd()
  {
    this.apiFailed = false;
  }
}