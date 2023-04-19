import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent implements OnInit {

  formBuscar: FormGroup;

  apiFailed: boolean = false;
  invalido: boolean = false;
  
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute)
  {
    this.formBuscar = this.fb.group({
      correo_o_telefono: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  
  ngOnInit(): void {
  }

  onSubmit(user: User)
  {
    location.assign('/recuperacion');
  }

  onAnimationEnd()
  {
    this.apiFailed = false;
  }
}
