import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-moderadores',
  templateUrl: './moderadores.component.html',
  styleUrls: ['./moderadores.component.css']
})
export class ModeradoresComponent implements OnInit {

  usuarios: User[] = [
    {'id':1, 'username': 'Javier', 'correo': 'javier.res220704@gmail.com', 'password': '123456', 'telefono': 1234567890, 'estatus': 1, 'codigo_verificacion': 1234, 'rol_id': 1, 'info_user_id': 0, 'correo_o_telefono': ''},
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
