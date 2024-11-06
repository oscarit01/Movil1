import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  loginError: boolean = false; // Variable para controlar el mensaje de error

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) { }

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home']); // Redirige a la página principal
    } catch (error: any) {
      this.loginError = true; // Activar el mensaje de error
      console.error('Error en el inicio de sesión:', error.message);
    }
  }

  // Función para navegar a la página de registro
  goToRegister() {
    this.router.navigate(['/register']); // Redirige a la página de registro
  }
}
