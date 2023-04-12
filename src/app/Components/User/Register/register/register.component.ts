import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  invalido: boolean = false;
  apiFailed: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private loginService: LoginService) 
  {
    this.form = this.fb.group({
      username:  ['', [Validators.required]],
      correo:  ['', [Validators.required, Validators.email]],
      telefono:  ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  verificarDisponibilidad(user: User)
  {
    this.loginService.verificarDisponibilidad(user).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/info_personal']);
      },
      error => {
        console.log(error);
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
