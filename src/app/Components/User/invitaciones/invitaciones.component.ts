import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoUsuario } from 'src/app/Interfaces/info-usuario';
import { Invitacion } from 'src/app/Interfaces/invitacion';
import { Tienda } from 'src/app/Interfaces/tienda';
import { TiendaUser } from 'src/app/Interfaces/tienda-user';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';
import { TiendasService } from 'src/app/Services/tiendas.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-invitaciones',
  templateUrl: './invitaciones.component.html',
  styleUrls: ['./invitaciones.component.css']
})
export class InvitacionesComponent implements OnInit {

  id: number = 0;

  formInvitar: FormGroup;
  formCode: FormGroup;

  invitaciones: Invitacion[] = [];
  tiendas: Tienda[] = [];
  allTiendas: Tienda[] = [];
  allUsers: User[] = [];
  allInfoUsers: InfoUsuario[] = [];
  tiendasOwner: TiendaUser[] = [];

  respuesta?: boolean;

  apiFailed: boolean = false;
  invalido: boolean = false;

  apiFailed1: boolean = false;
  invalido1: boolean = false;

  apiFailed2: boolean = false;
  invalido2: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService, private tiendaService: TiendasService, private adminService: AdminService)
  {
    this.formInvitar = this.fb.group({
      owner_id: null,
      invitado_id: ['', [Validators.required]],
      tienda_id: ['', [Validators.required]],
      fecha: null,
    });

    this.formCode = this.fb.group({
      user_id: null,
      codigo: ['', [Validators.required]],
    });
  }

  setData()
  {
    this.formInvitar.get('owner_id')?.setValue(this.id);
    this.formInvitar.get('fecha')?.setValue(new Date());

    this.formCode.get('user_id')?.setValue(this.id);
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id') as unknown as number;
    this.setData();
    this.getTiendasOwner();
    this.getAllTiendas();
    this.getTiendas();
    this.getAllUsers();
    this.getInvitaciones();
    this.getAllInfoUsers();
  }

  getTiendas()
  {
    this.tiendaService.getTiendas().subscribe(
      (data) => {
        this.tiendas = data;
      }
    );
  }

  getAllTiendas()
  {
    this.tiendaService.getTiendas().subscribe(
      (data) => {
        this.allTiendas = data;
      }
    );
  }

  getAllUsers()
  {
    this.adminService.getUsuariosNormales().subscribe(
      (data) => {
        this.allUsers = data;
      }
    );
  }

  getAllInfoUsers()
  {
    this.userService.getAllInfoPersonal().subscribe(
      (data) => {
        this.allInfoUsers = data;
      }
    );
  }

  getTiendasOwner()
  {
    this.userService.getTiendasOwner().subscribe(
      (data) => {
        for (let x in data)
        {
          if (data[x].user_id === Number(this.id))
            this.tiendasOwner.push(data[x]);
        }
      }
    );
  }

  getInvitaciones()
  {
    this.userService.getInvitaciones(this.id).subscribe(
      (data) => {
        this.invitaciones = data;
      }
    );
  }

  getNombreTienda(id: number)
  {
    const tienda = this.tiendas.find(tienda => tienda.id === id);

    return tienda ? tienda.nombre : "";
  }

  getNombreCompletoOwner(id: number)
  {
    const user = this.allUsers.find(user => user.id === id);

    const infoUser = this.allInfoUsers.find(infoUser => infoUser.id === user?.info_user_id);

    return infoUser ? infoUser.nombre + " " + infoUser.ap_paterno + " " + infoUser.ap_materno : "";
  }

  getCorreoOwner(id: number)
  {
    const user = this.allUsers.find(user => user.id === id);

    return user ? user.correo : "";
  }
  
  getUsernameOwner(id: number)
  {
    const user = this.allUsers.find(user => user.id === id);

    return user ? user.username : "";
  }

  getTiendaNombre(id: number)
  {
    const tienda = this.allTiendas.find(tienda => tienda.id === id)

    return tienda ? tienda.nombre : "";
  }

  onSubmitInvitacion(id: number, respuesta: boolean)
  {
    const dict = {invitacion_id: String(id), respuesta: respuesta}

    this.userService.procesarInvitacion(dict).subscribe(
      (data) => {
        location.reload();
      },
      (error) => {
        this.invalido2 = true;
        this.apiFailed2 = true;
      }
    );
  }

  onSubmitInvitar(invitacion: Invitacion)
  {
    this.userService.enviarInvitacion(invitacion).subscribe(
      (data) => {
        location.reload();
      },
      (error) => {
        this.invalido1 = true;
        this.apiFailed1 = true;
      }
    );
  }

  onSubmitCode(invitacion: Invitacion)
  {
    this.userService.unirmeATienda(invitacion).subscribe(
      (data) => {
        location.assign('/home');
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
    this.apiFailed1 = false;
    this.apiFailed2 = false;
  }
}
