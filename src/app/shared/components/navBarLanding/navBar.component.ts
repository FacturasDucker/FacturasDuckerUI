import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
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
      url: '/faq'
    },
    {
      name: 'PREGUNTAS FRECUENTES',
      url: '/faq'
    },
    {
      name: 'CONECTA GFA',
      url: '/main'
    }
  ]
}
