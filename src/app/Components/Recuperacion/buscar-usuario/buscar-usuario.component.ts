import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent implements OnInit {

  formBuscar: FormGroup;

  apiFailed: boolean = false;
  invalido: boolean = false;
  
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService)
  {
    this.formBuscar = this.fb.group({
      correo_o_telefono: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  
  ngOnInit(): void {
  }

  onSubmit(user: User)
  {
    this.userService.buscarUsuario(user).subscribe(
      (data) => {
        localStorage.setItem('id', String(data.id));
        location.assign('/recuperacion');
      },
      (error) => {
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
