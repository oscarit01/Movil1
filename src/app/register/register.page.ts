import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  emailError: boolean = false;

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) {}

  async register() {
    if (!this.isEmailValid(this.email)) {
      this.emailError = true;
      return; 
    }
    this.emailError = false;

    try {
      await this.authService.register(this.email, this.password);
      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: 'Usuario registrado correctamente.',
        buttons: [{
          text: 'Aceptar',
          handler: () => this.router.navigate(['/login'])
        }]
      });
      await alert.present();
    } catch (error: any) {
      alert('Error en el registro: ' + error.message);
    }
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
