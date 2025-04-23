import { Component } from '@angular/core';
import { NavBarComponent } from "../../../shared/components/navBarLanding/navBar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavBarComponent, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent { }
