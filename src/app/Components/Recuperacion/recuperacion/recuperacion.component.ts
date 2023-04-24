import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { InfoUsuario } from 'src/app/Interfaces/info-usuario';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.component.html',
  styleUrls: ['./recuperacion.component.css']
})
export class RecuperacionComponent implements OnInit {

  id: number = 0;

  formCode1: FormGroup;
  formCode2: FormGroup;
  formRespuesta: FormGroup;

  usuario!: User;

  apiFailed: boolean = false;
  invalido: boolean = false;

  enviado1: boolean = false;
  enviado2: boolean = false;
  
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService, private adminService: AdminService)
  {
    this.formCode1 = this.fb.group({
      codigo_verificacion: ['', [Validators.required]],
    });

    this.formCode2 = this.fb.group({
      codigo_verificacion: ['', [Validators.required]],
    });

    this.formRespuesta = this.fb.group({
      user_id: null,
      pregunta: ['', [Validators.required]],
      respuesta: ['', [Validators.required]],
    });
  }
  
  ngOnInit(): void {
    this.id = localStorage.getItem('id') as unknown as number;
    this.getUsuario();
    this.setData();
    this.getPregunta();
  }

  getUsuario()
  {
    this.adminService.getUsuarioUnico(this.id).subscribe(
      (data: any) => {
        this.usuario = data;
        console.log(this.usuario);
      }
    );
  }

  setData()
  {
    this.formRespuesta.get('user_id')?.setValue(this.id);
  }

  enviarCodigo1()
  {
    const dict = {correo: this.usuario.correo};
    console.log(dict);

    this.userService.recuperacionCorreo(dict).subscribe(
      data => {
        this.enviado1 = true;
      },
      error => {
        console.log(error);
        this.apiFailed = true;
        this.invalido = true;
      }
    );
  }

  enviarCodigo2()
  {
    const dict = {telefono: this.usuario.telefono};
    console.log(dict);

    this.userService.recuperacionTelefono(dict).subscribe(
      data => {
        this.enviado2 = true;
      },
      error => {
        console.log(error);
        this.apiFailed = true;
        this.invalido = true;
      }
    );
  }

  getPregunta()
  {
    this.userService.getMyPregunta(this.id).subscribe(
      (data: any) => {
        this.formRespuesta.controls['pregunta'].setValue(data.data);
      }
    );
  }

  onSubmitCode(user: User)
  {
    this.userService.verifyCode(this.id, user).subscribe(
      data => {
        this.router.navigate(['/cambiar_password']);
      }
    );
  }

  onSubmitRespuesta(infoUser: InfoUsuario)
  {
    this.userService.recuperacionRepuesta(infoUser).subscribe(
      data => {
        localStorage.setItem('id', String(this.id));
        this.router.navigate(['/cambiar_password']);
      },
      error => {
        this.apiFailed = true;
        this.invalido = true;
      }
    );
  }

  onAnimationEnd()
  {
    this.apiFailed = false;
  }
}