import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client';
import { AdminService } from 'src/app/Services/admin.service';
import { TiendasService } from 'src/app/Services/tiendas.service';
import { UsersTiendasService } from 'src/app/Services/users-tiendas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-sensores-drawer',
  templateUrl: './info-sensores-drawer.component.html',
  styleUrls: ['./info-sensores-drawer.component.css']
})
export class InfoSensoresDrawerComponent implements OnInit {

  public socket = io(environment.urlapi); 

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private tiendasService: TiendasService, private adminService: AdminService, private usersInvitacionesService: UsersTiendasService ,private dialogRef: MatDialogRef<InfoSensoresDrawerComponent>, @Inject(MAT_DIALOG_DATA) private data: { id: number })
  {}

  ngOnInit(): void {
    this.socket.on('casa-' +String(this.data.id), (data: any) => {
      console.log("Recibido");
    });
  }

  closeDialog()
  {
    this.dialogRef.close();
  }
}