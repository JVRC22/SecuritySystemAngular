import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: User[] = [
    {'id':1, 'username': 'Javier', 'correo': 'javier.res220704@gmail.com', 'password': '123456', 'telefono': 1234567890, 'estatus': 1, 'codigo_verificacion': 1234, 'rol_id': 1, 'info_user_id': 1, 'correo_o_telefono': ''},
  ];

  constructor() { }

  ngOnInit(): void {
  }
}