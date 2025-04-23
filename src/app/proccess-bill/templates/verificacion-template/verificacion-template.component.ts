import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicUserInfo } from '../../interfaces/basicUserInfo';
import { BasicInfoComponent } from '../../components/basic-info/basic-info.component';

@Component({
  selector: 'bill-verificacion-template',
  standalone: true,
  imports: [CommonModule, BasicInfoComponent],
  templateUrl: './verificacion-template.component.html',
  styleUrl: './verificacion-template.component.css'
})
export class VerificacionTemplateComponent {
  // Template component for bill verification
  // Renders the basic information component for data review
}
