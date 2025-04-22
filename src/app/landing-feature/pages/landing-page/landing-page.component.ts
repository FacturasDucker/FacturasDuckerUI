import { Component } from '@angular/core';
import { NavBarComponent } from "../../../shared/components/navBarLanding/navBar.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-landing-page',
  imports: [NavBarComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'

})
export class LandingPageComponent { }
