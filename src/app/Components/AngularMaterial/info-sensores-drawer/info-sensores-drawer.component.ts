import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client';
import { AdminService } from 'src/app/Services/admin.service';
import { SensoresService } from 'src/app/Services/sensores.service';
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

  temperatura: any;
  agua: any;
  luz: any;
  humo: any;
  movimiento: any;
  infrarrojo: any;
  ultrasonico: any;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private tiendasService: TiendasService, private adminService: AdminService, private usersInvitacionesService: UsersTiendasService, private sensoresService: SensoresService, private dialogRef: MatDialogRef<InfoSensoresDrawerComponent>, @Inject(MAT_DIALOG_DATA) private data: { id: number })
  {}

  ngOnInit(): void {
    this.getTemperatura();
    this.getAgua();
    this.getLuz();
    this.getHumo();
    this.getMovimiento();
    this.getInfrarrojo();
    this.getUltrasonico();

    this.socket.on('casa-' +String(this.data.id), (data: any) => {
      console.log("Recibido");
      this.getTemperatura();
      this.getAgua();
      this.getLuz();
      this.getHumo();
      this.getMovimiento();
      this.getInfrarrojo();
      this.getUltrasonico();
    });
  }

  getTemperatura()
  {
    this.sensoresService.getTemperatura(this.data.id).subscribe((data: any) => {
      console.log(data);
      this.temperatura = data;
    });
  }

  getAgua()
  {
    this.sensoresService.getAgua(this.data.id).subscribe((data: any) => {
      console.log(data);
      this.agua = data;
    });
  }

  getLuz()
  {
    this.sensoresService.getLuz(this.data.id).subscribe((data: any) => {
      console.log(data);
      this.luz = data;
    });
  }

  getHumo()
  {
    this.sensoresService.getHumo(this.data.id).subscribe((data: any) => {
      console.log(data);
      this.humo = data;
    });
  }

  getMovimiento()
  {
    this.sensoresService.getMovimiento(this.data.id).subscribe((data: any) => {
      console.log(data);
      this.movimiento = data;
    });
  }

  getInfrarrojo()
  {
    this.sensoresService.getInfrarrojo(this.data.id).subscribe((data: any) => {
      console.log(data);
      this.infrarrojo = data;
    });
  }

  getUltrasonico()
  {
    this.sensoresService.getDistancia(this.data.id).subscribe((data: any) => {
      console.log(data);
      this.ultrasonico = data;
    });
  }

  closeDialog()
  {
    this.dialogRef.close();
  }
}