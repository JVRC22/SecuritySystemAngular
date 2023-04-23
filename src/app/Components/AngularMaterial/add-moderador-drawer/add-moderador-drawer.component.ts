import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-add-moderador-drawer',
  templateUrl: './add-moderador-drawer.component.html',
  styleUrls: ['./add-moderador-drawer.component.css']
})
export class AddModeradorDrawerComponent implements OnInit {

  formAddModerador: FormGroup;

  apiFailed: boolean = false;
  invalido: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private adminService: AdminService, private dialogRef: MatDialogRef<AddModeradorDrawerComponent>)
  {
    this.formAddModerador = this.fb.group({
      username:  ['', [Validators.required, Validators.minLength(5)]],
      correo:  ['', [Validators.required, Validators.email]],
      telefono:  ['', [Validators.required, Validators.min(1000000000)]],
      password:  ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
  }

  addUsuarioModerador(user: User)
  {
    this.adminService.addUsuarioModerador(user).subscribe(
      response => {
        this.dialogRef.close();
      },
      error => {
        this.apiFailed = true;
        this.invalido = true;
      }
    );
  }

  closeDialog()
  {
    this.dialogRef.close();
  }

  onAnimationEnd()
  {
    this.apiFailed = false;
  }
}