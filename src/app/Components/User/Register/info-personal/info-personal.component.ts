import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.component.html',
  styleUrls: ['./info-personal.component.css']
})
export class InfoPersonalComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private loginService: LoginService) 
  {
    this.form = this.fb.group({
      nombre:  ['', [Validators.required]],
      ap_paterno:  ['', [Validators.required]],
      ap_materno:  ['', [Validators.required]],
      sexo:  ['', [Validators.required]],
      fecha_nacimiento:  ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
}
