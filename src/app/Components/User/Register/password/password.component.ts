import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { InfoRegistroService } from 'src/app/Services/info-registro.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  form: FormGroup;
  invalido: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private loginService: LoginService, private infoRegistroService: InfoRegistroService) 
  {
    this.form = this.fb.group({
      password:  ['', [Validators.required, Validators.minLength(8)]],
      password_confirm:  ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
  }

  guardarPassword(user: User)
  {
    if(this.form.get('password')?.value == this.form.get('password_confirm')?.value)
    {
      this.infoRegistroService.password = user.password;
      this.router.navigate(['/pregunta_recuperacion']);
    }

    else
    {
      console.log("Las contraseñas no coinciden");
      this.invalido = true;
    }
  }
}
