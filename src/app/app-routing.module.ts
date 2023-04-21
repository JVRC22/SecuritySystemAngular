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
import { TokenGuard } from './Guards/token.guard';
import { InfoCuentaComponent } from './Components/User/info-cuenta/info-cuenta.component';
import { ActivacionCuentaComponent } from './Components/User/Activation/activacion-cuenta/activacion-cuenta.component';
import { SolicitudAdminComponent } from './Components/User/Activation/solicitud-admin/solicitud-admin.component';
import { StatusGuard } from './Guards/status.guard';
import { CambiarPasswordComponent } from './Components/Recuperacion/cambiar-password/cambiar-password.component';
import { RoleGuard } from './Guards/role.guard';
import { SensoresComponent } from './Components/User/sensores/sensores.component';
import { InvitacionesComponent } from './Components/User/invitaciones/invitaciones.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  //Home
  { path: 'welcome', component:WelcomeComponent, title: 'Bienvenido a ShopShield' },

  //Loggueo
  { path: 'login', component:LoginComponent, title: 'Iniciar Sesion - ShopShield' },

  { path: 'register', component:RegisterComponent, title: 'Registrate - ShopShield' },
  { path: 'info_personal', component:InfoPersonalComponent, title: 'Registrate - ShopShield' },
  { path: 'password', component:PasswordComponent, title: 'Registrate - ShopShield' },
  { path: 'pregunta_recuperacion', component:PreguntaSeguridadComponent, title: 'Registrate - ShopShield' },

  //Activacion de Cuentas
  { path: 'activacion', component:ActivacionCuentaComponent, title: 'Activa tu Cuenta - ShopShield' },
  { path: 'solicitud', component:SolicitudAdminComponent, title: 'Reactiva tu Cuenta - ShopShield' },

  //Recuperacion de Cuentas
  { path: 'buscar_usuario', component:BuscarUsuarioComponent, title: 'Recupera tu Cuenta - ShopShield' },
  { path: 'recuperacion', component:RecuperacionComponent, title: 'Recupera tu Cuenta - ShopShield' },
  { path: 'cambiar_password', component:CambiarPasswordComponent, title: 'Recupera tu Cuenta - ShopShield' },

  //Usuarios
  { path: 'home', component:HomeComponent, title: 'Home - ShopShield' },
  { path: 'sensores', component:SensoresComponent, title: 'Informacion de Tienda - ShopShield' },
  { path: 'invitaciones', component:InvitacionesComponent, title: 'Invitaciones - ShopShield' },
  { path: 'info', component:InfoCuentaComponent, title: 'Informacion de Cuenta - ShopShield' },

  //Administradores
  { path: 'usuarios', component:UsuariosComponent, title: 'Usuarios - ShopShield' },
  { path: 'moderadores', component:ModeradoresComponent, title: 'Moderadores - ShopShield' },
  { path: 'tiendas', component:TiendasComponent, title: 'Tiendas - ShopShield' },
  { path: 'peticiones', component:PeticionesComponent, title: 'Peticiones - ShopShield' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
