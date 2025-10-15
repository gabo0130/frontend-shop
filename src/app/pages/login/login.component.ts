import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../models/login.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const dto: LoginDto = { email: this.email, password: this.password };
    this.authService.login(dto).subscribe({
      next: (response) => {
        console.log('Login success, navigating to home');
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error('Login error:', err);
        this.error = err.error?.message || 'Error de autenticación';
      }
    });
  }
}