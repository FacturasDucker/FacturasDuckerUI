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
  // Navigation bar links configuration
  navBarData = [
    {
      name: 'HOME',
      url: '/'
    },
    {
      name: 'PRIVACY NOTICE',
      url: '/faq'
    },
    {
      name: 'FREQUENTLY ASKED QUESTIONS',
      url: '/faq'
    },
    {
      name: 'CONECTA GFA',
      url: '/main'
    }
  ]
}
