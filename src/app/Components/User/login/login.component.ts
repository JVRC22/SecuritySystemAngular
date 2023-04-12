import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  invalido: boolean = false;
  apiFailed: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private loginService: LoginService) 
  {
    this.form = this.fb.group({
      correo_o_telefono:  ['', [Validators.required]],
      password:  ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(user: User)
  {
    this.loginService.login(user).subscribe(
      (response: any) => {
        localStorage.setItem('id', response.id);
        localStorage.setItem('username', response.username);
        localStorage.setItem('token', response.token.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/home']);
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
