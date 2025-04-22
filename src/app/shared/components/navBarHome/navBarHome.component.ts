import { Component } from '@angular/core';
import { LinkeablesComponent } from "./linkeables/linkeables.component";
import { LogoFlechaComponent } from "../logo-flecha/logo-flecha.component";
import { PerfilUserComponent } from "../perfil-user/perfil-user.component";

@Component({
  selector: 'app-nav-bar-home',
  imports: [LinkeablesComponent, LogoFlechaComponent, PerfilUserComponent],
  templateUrl: './navBarHome.component.html',
})
export class NavBarHomeComponent { }
