import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkRol();
  }

  checkRol()
  {
    const role = Number(localStorage.getItem('role'));

    if (role == 1 || role == 2) 
    {
      location.assign('/usuarios');
    }

    else if (role == 3) 
    {
      location.assign('/home');
    }
  }
}
