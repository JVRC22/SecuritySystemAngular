import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoRegistroService {

  constructor() { }

  id: number = 0;
  username: string = "";
  correo: string = "";
  telefono: string = "";
  password: string = "";
  nombre: string = "";
  ap_paterno: string = "";
  ap_materno: string = "";
  sexo: string = "";
  fecha_nacimiento: string = "";
  pregunta_id: number = 0;
  respuesta: string = "";

  getInfoRegistro()
  {
    return {
      id: this.id,
      username: this.username,
      correo: this.correo,
      telefono: this.telefono,
      password: this.password,
      nombre: this.nombre,
      ap_paterno: this.ap_paterno,
      ap_materno: this.ap_materno,
      sexo: this.sexo,
      fecha_nacimiento: this.fecha_nacimiento,
      pregunta_id: this.pregunta_id,
      respuesta: this.respuesta
    }
  }
}
