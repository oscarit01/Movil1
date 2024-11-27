import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  loginError: string | null = null; // Variable para controlar los errores

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async login() {
    if (!this.email || !this.password) {
      this.showAlert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      await this.authService.login(this.email, this.password);
      this.loginError = null; // Limpia cualquier error previo
      await loading.dismiss();
      this.router.navigate(['/home']); // Redirige a la página principal
    } catch (error: any) {
      await loading.dismiss();
      this.loginError = 'Credenciales incorrectas. Inténtalo de nuevo.';
      console.error('Error en el inicio de sesión:', error.message);
    }
  }

  // Mostrar un mensaje de alerta
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Función para navegar a la página de registro
  goToRegister() {
    this.router.navigate(['/register']); // Redirige a la página de registro
  }
}
