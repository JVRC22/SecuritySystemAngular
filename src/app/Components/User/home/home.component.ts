import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tienda } from 'src/app/Interfaces/tienda';
import { TiendaUser } from 'src/app/Interfaces/tienda-user';
import { TiendasService } from 'src/app/Services/tiendas.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id: number = 0;
  tiendas: Tienda[] = [];
  misTiendas: TiendaUser[] = [];

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService, private tiendasService: TiendasService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('id') as unknown as number;
    this.getTiendas();
    this.getMisTiendas();
  }

  getTiendas()
  {
    this.tiendasService.getTiendas().subscribe(
      (data) => {
        this.tiendas = data;
        console.log(this.tiendas);
      }
    );
  }

  getMisTiendas()
  {
    this.userService.misTiendasToken().subscribe(
      (data) => {
        this.misTiendas = data;
        console.log(this.misTiendas);
      }
    );
  }

  sensores(id: number)
  {
    this.router.navigate(['sensores/' + id]);
  }
}