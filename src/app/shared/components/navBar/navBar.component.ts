import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './navBar.component.html',
})
export class NavBarComponent {
  navBarData = [
    {
      name: 'INICIO',
      url: '/'
    },
    {
      name: 'AVISO DE PRIVACIDAD',
      url: '/test'
    },
    {
      name: 'PREGUNTAS FRECUENTES',
      url: '/test'
    },
    {
      name: 'CONECTA GFA',
      url: '/test'
    }
  ]
}
