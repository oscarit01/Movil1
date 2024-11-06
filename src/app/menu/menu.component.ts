import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/profile']); // Cambia la ruta según tu configuración
  }

  goToAbout() {
    this.router.navigate(['/about']); // Cambia la ruta según tu configuración
  }

  logout() {
    // Lógica de cierre de sesión
  }
}
