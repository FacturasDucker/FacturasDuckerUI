import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  onSubmit() {

    console.log('Intentando registrar con:', this.email);
  }
}