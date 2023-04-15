import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tienda } from 'src/app/Interfaces/tienda';
import { TiendaUser } from 'src/app/Interfaces/tienda-user';
import { User } from 'src/app/Interfaces/user';
import { AdminService } from 'src/app/Services/admin.service';
import { TiendasService } from 'src/app/Services/tiendas.service';
import { UsersTiendasService } from 'src/app/Services/users-tiendas.service';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

  tiendas: Tienda[] = [];
  owners: TiendaUser[] = [];
  users: User[] = [];
  
  formTienda: FormGroup;

  constructor(private usersInvitacionesService: UsersTiendasService, private tiendasService: TiendasService, private adminService: AdminService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute)
  {
    this.formTienda = this.fb.group({
      nombre:  ['', [Validators.required, Validators.minLength(5)]],
      user_id:  ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getTiendas();
    this.getOwners();
    this.getUsers();
  }

  getTiendas()
  {
    this.tiendasService.getTiendas().subscribe(
      data => {
        this.tiendas = data;
      }
    );
  }

  getOwners()
  {
    this.usersInvitacionesService.getOwners().subscribe(
      data => {
        this.owners = data;
      }
    );
  }

  getUsers()
  {
    this.adminService.getUsuariosNormales().subscribe(
      data => {
        this.users = data;
      }
    );
  }

  getOwnerTienda(tienda_id: number)
  {
    const owner = this.owners.find(owner => owner.tienda_id === tienda_id);

    const user = this.users.find(user => user.id === owner?.user_id);

    return user ? user.correo : "";
  }

  addTienda(tienda: Tienda)
  {
    this.tiendasService.addTienda(tienda).subscribe(
      response => {
        location.reload();
      },
      error => {
        console.log(error);
        alert("Error al agregar la tienda");
      }
    );
  }
}
