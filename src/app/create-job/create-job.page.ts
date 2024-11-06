import { Component } from '@angular/core';
import { JobService } from '../job.service'; // Importar el servicio JobService
import { Router } from '@angular/router'; // Importar Router para la redirección
import { Job } from '../job.model'; // Importar el modelo de Job
import { AuthService } from '../auth.service'; // Importar AuthService para obtener el ID del usuario

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.page.html',
  styleUrls: ['./create-job.page.scss'],
})
export class CreateJobPage {
  job = {
    title: '',
    category: '',
    description: '',
  };
  errorMessage: string | null = null; // Variable para el mensaje de error
  successMessage: string | null = null; // Variable para el mensaje de éxito

  constructor(private jobService: JobService, private router: Router, private authService: AuthService) {}

  // Método para crear un nuevo trabajo
  async createJob() {
    // Verificar si todos los campos están llenos
    if (!this.job.title || !this.job.category || !this.job.description) {
      this.errorMessage = 'Faltan datos. Por favor, completa todos los campos.';
      this.successMessage = null; // Limpiar mensaje de éxito si hay error
      return; // No crear la oferta de trabajo si hay campos vacíos
    }

    // Obtener el ID del usuario autenticado
    const userId = await this.authService.getUserId(); // Asegúrate de que este método existe en AuthService

    // Crear un nuevo trabajo con los datos del formulario
    const newJob: Job = {
      title: this.job.title,
      category: this.job.category,
      description: this.job.description,
      userId: userId || '', // Establecer el userId aquí
    };

    // Agregar el trabajo usando el servicio
    try {
      await this.jobService.addJob(newJob); // Esperar a que se complete la adición
      this.successMessage = 'Trabajo creado con éxito!';
      this.errorMessage = null; // Limpiar el mensaje de error si la oferta se crea correctamente

      // Limpiar los campos después de la creación
      this.job = { title: '', category: '', description: '' };

      // Redirigir a la lista de trabajos después de 1 segundo
      setTimeout(() => {
        this.router.navigate(['/job-list']); // Asegúrate de que esta ruta sea la correcta
      }, 1000);
    } catch (error: unknown) {
      // Mostrar mensaje de error si algo falla
      if (error instanceof Error) {
        this.errorMessage = 'Ocurrió un error al crear el trabajo: ' + error.message; // Maneja el error de forma segura
      } else {
        this.errorMessage = 'Ocurrió un error inesperado.';
      }
      this.successMessage = null; // Limpiar el mensaje de éxito si ocurre un error
      console.error('Error al crear trabajo:', error); // Mensaje de error para depuración
    }
  }

  // Métodos de navegación
  goToProfile() {
    this.router.navigate(['/profile']); // Redirigir a la página del perfil
  }

  goToAbout() {
    this.router.navigate(['/about']); // Redirigir a la página "Acerca de"
  }

  logout() {
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}
