import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  id: number = 0;

  formPassword: FormGroup;

  apiFailed: boolean = false;
  invalido: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService)
  {
    this.formPassword = this.fb.group({
      user_id: null,
      password:  ['', [Validators.required, Validators.minLength(8)]],
      password_confirm:  ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id') as unknown as number;
    this.setData();
  }

  setData()
  {
    this.formPassword.get('user_id')?.setValue(this.id);
    console.log(this.formPassword.get('user_id')?.value);
  }

  onSubmit(user: User)
  {
    if(this.formPassword.get('password')?.value == this.formPassword.get('password_confirm')?.value)
    {
      this.userService.updatePassword(user).subscribe(
        (data) => {
          localStorage.clear();
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.invalido = true;
          this.apiFailed = true;
        }
      );
    }

    else
    {
      this.invalido = true;
      this.apiFailed = true;
    }
  }

  onAnimationEnd()
  {
    this.apiFailed = false;
  }
}
