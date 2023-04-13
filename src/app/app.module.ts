import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SidebarComponent } from './Components/Admin/sidebar/sidebar.component';
import { TiendasComponent } from './Components/Admin/tiendas/tiendas.component';
import { UsuariosComponent } from './Components/Admin/usuarios/usuarios.component';
import { ModeradoresComponent } from './Components/Admin/moderadores/moderadores.component';
import { HomeComponent } from './Components/User/home/home.component';
import { LoginComponent } from './Components/User/login/login.component';
import { RegisterComponent } from './Components/User/Register/register/register.component';
import { InfoPersonalComponent } from './Components/User/Register/info-personal/info-personal.component';
import { PasswordComponent } from './Components/User/Register/password/password.component';
import { PreguntaSeguridadComponent } from './Components/User/Register/pregunta-seguridad/pregunta-seguridad.component';
import { CodigoInvitacionComponent } from './Components/User/codigo-invitacion/codigo-invitacion.component';
import { ActivacionCuentaComponent } from './Components/User/Activation/activacion-cuenta/activacion-cuenta.component';
import { SolicitudAdminComponent } from './Components/User/Activation/solicitud-admin/solicitud-admin.component';
import { NavbarComponent } from './Components/User/navbar/navbar.component';
import { WelcomeComponent } from './Components/User/welcome/welcome.component';
import { InvitadosComponent } from './Components/Admin/invitados/invitados.component';
import { PeticionesComponent } from './Components/Admin/peticiones/peticiones.component';
import { BuscarUsuarioComponent } from './Components/Recuperacion/buscar-usuario/buscar-usuario.component';
import { RecuperacionComponent } from './Components/Recuperacion/recuperacion/recuperacion.component';
import { TokenInterceptor } from './Interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TiendasComponent,
    UsuariosComponent,
    ModeradoresComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    InfoPersonalComponent,
    PasswordComponent,
    PreguntaSeguridadComponent,
    CodigoInvitacionComponent,
    ActivacionCuentaComponent,
    SolicitudAdminComponent,
    NavbarComponent,
    WelcomeComponent,
    InvitadosComponent,
    PeticionesComponent,
    BuscarUsuarioComponent,
    RecuperacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
