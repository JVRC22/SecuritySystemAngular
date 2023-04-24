import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-activacion-cuenta',
  templateUrl: './activacion-cuenta.component.html',
  styleUrls: ['./activacion-cuenta.component.css']
})
export class ActivacionCuentaComponent implements OnInit {

  formCode: FormGroup;

  id: number = 0;

  apiFailed: boolean = false;
  invalido: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService)
  {
    this.formCode = this.fb.group({
      codigo_verificacion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id') as unknown as number;
  }

  enviarCorreo()
  {}

  reenviarCodigo()
  {}

  onSubmit(user: User)
  {
    this.userService.verifyCode(this.id, user).subscribe(
      (data) => {
        this.router.navigate(['/login']);
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
