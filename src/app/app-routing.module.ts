import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/User/home/home.component';
import { UsuariosComponent } from './Components/Admin/usuarios/usuarios.component';
import { ModeradoresComponent } from './Components/Admin/moderadores/moderadores.component';
import { TiendasComponent } from './Components/Admin/tiendas/tiendas.component';
import { LoginComponent } from './Components/User/login/login.component';
import { RegisterComponent } from './Components/User/Register/register/register.component';
import { PeticionesComponent } from './Components/Admin/peticiones/peticiones.component';
import { InfoPersonalComponent } from './Components/User/Register/info-personal/info-personal.component';
import { PasswordComponent } from './Components/User/Register/password/password.component';
import { PreguntaSeguridadComponent } from './Components/User/Register/pregunta-seguridad/pregunta-seguridad.component';
import { BuscarUsuarioComponent } from './Components/Recuperacion/buscar-usuario/buscar-usuario.component';
import { RecuperacionComponent } from './Components/Recuperacion/recuperacion/recuperacion.component';
import { WelcomeComponent } from './Components/User/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },

  //Home
  { path: 'welcome', component:WelcomeComponent, title: 'Welcome' },

  //Loggueo
  { path: 'login', component:LoginComponent, title: 'Login' },

  { path: 'register', component:RegisterComponent, title: 'Register' },
  { path: 'info_personal', component:InfoPersonalComponent, title: 'Register' },
  { path: 'password', component:PasswordComponent, title: 'Register' },
  { path:'pregunta_recuperacion', component:PreguntaSeguridadComponent, title: 'Register' },

  { path: 'buscar_usuario', component:BuscarUsuarioComponent, title: 'Recuperacion' },
  { path: 'recuperacion', component:RecuperacionComponent, title: 'Recuperacion' },

  //Usuarios
  { path: 'home', component:HomeComponent },

  //Administradores
  { path: 'usuarios', component:UsuariosComponent },
  { path: 'moderadores', component:ModeradoresComponent },
  { path: 'tiendas', component:TiendasComponent },
  { path: 'peticiones', component:PeticionesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
