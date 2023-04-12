import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  cambiarModo()
  {}

  logout()
  {
    if(confirm('¿Seguro que desea cerrar sesión?'))
    {
      this.loginService.logout().subscribe(response => {
        localStorage.clear();
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
      });
    }
  }
}
