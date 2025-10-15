import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginDto } from '../../models/login.dto';
import { InputComponent } from "../../components/atoms/input/input.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [InputComponent]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const dto: LoginDto = { email: this.email, password: this.password };
    this.authService.login(dto).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => this.error = err.error?.message || 'Error de autenticación'
    });
  }
}