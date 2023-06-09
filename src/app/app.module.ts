import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

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
import { PeticionesComponent } from './Components/Admin/peticiones/peticiones.component';
import { BuscarUsuarioComponent } from './Components/Recuperacion/buscar-usuario/buscar-usuario.component';
import { RecuperacionComponent } from './Components/Recuperacion/recuperacion/recuperacion.component';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { InfoCuentaComponent } from './Components/User/info-cuenta/info-cuenta.component';
import { CambiarPasswordComponent } from './Components/Recuperacion/cambiar-password/cambiar-password.component';
import { SensoresComponent } from './Components/User/sensores/sensores.component';
import { InvitacionesComponent } from './Components/User/invitaciones/invitaciones.component';
import { DeleteModalComponent } from './Components/AngularMaterial/delete-modal/delete-modal.component';
import { AddInvitadoModalComponent } from './Components/AngularMaterial/add-invitado-modal/add-invitado-modal.component';
import { ModificarTiendaModalComponent } from './Components/AngularMaterial/modificar-tienda-modal/modificar-tienda-modal.component';
import { AdministrarInvitadosDrawerComponent } from './Components/AngularMaterial/administrar-invitados-drawer/administrar-invitados-drawer.component';
import { ModificarInfoCuentaDrawerComponent } from './Components/AngularMaterial/modificar-info-cuenta-drawer/modificar-info-cuenta-drawer.component';
import { ModificarInfoUsuarioDrawerComponent } from './Components/AngularMaterial/modificar-info-usuario-drawer/modificar-info-usuario-drawer.component';
import { ModificarModeradorDrawerComponent } from './Components/AngularMaterial/modificar-moderador-drawer/modificar-moderador-drawer.component';
import { AddModeradorDrawerComponent } from './Components/AngularMaterial/add-moderador-drawer/add-moderador-drawer.component';
import { VerInvitadosDrawerComponent } from './Components/AngularMaterial/ver-invitados-drawer/ver-invitados-drawer.component';
import { InfoSensoresDrawerComponent } from './Components/AngularMaterial/info-sensores-drawer/info-sensores-drawer.component';
import { AddTiendaDrawerComponent } from './Components/AngularMaterial/add-tienda-drawer/add-tienda-drawer.component';

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
    PeticionesComponent,
    BuscarUsuarioComponent,
    RecuperacionComponent,
    InfoCuentaComponent,
    CambiarPasswordComponent,
    SensoresComponent,
    InvitacionesComponent,
    DeleteModalComponent,
    AddInvitadoModalComponent,
    ModificarTiendaModalComponent,
    AdministrarInvitadosDrawerComponent,
    ModificarInfoCuentaDrawerComponent,
    ModificarInfoUsuarioDrawerComponent,
    ModificarModeradorDrawerComponent,
    AddModeradorDrawerComponent,
    VerInvitadosDrawerComponent,
    InfoSensoresDrawerComponent,
    AddTiendaDrawerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDialogModule
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
