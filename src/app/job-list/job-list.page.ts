import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service'; // Importa el servicio
import { Job } from '../job.model'; // Importa la interfaz Job
import { Router } from '@angular/router'; // Importa Router para la navegación
import { AuthService } from '../auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.page.html',
  styleUrls: ['./job-list.page.scss'],
})
export class JobListPage implements OnInit {
  jobs: Job[] = []; // Arreglo para almacenar los trabajos
  currentUserId: string | null = null; // Variable para almacenar el ID del usuario actual

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Obtener el ID del usuario autenticado
    this.currentUserId = await this.authService.getUserId(); // Asegúrate de que este método existe en AuthService

    // Suscribirse al Observable para obtener los trabajos
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs; // Asigna los trabajos al arreglo
      console.log('Trabajos cargados:', this.jobs); // Verifica que los trabajos se carguen correctamente
    });
  }

  // Método para manejar el clic en el botón de editar
  handleEditClick(jobId: string | undefined, event: Event) {
    if (jobId) {
      this.goToEditJob(jobId);
      event.stopPropagation(); // Detiene la propagación del evento
    }
  }

  // Método para navegar a la página de edición del trabajo
  goToEditJob(jobId: string) {
    console.log('Navegando a la página de edición del trabajo con ID:', jobId);
    this.router.navigate(['/edit-job', jobId]);
  }

  // Método para navegar a la vista detallada del trabajo
  goToJobDetail(job: Job) {
    if (job.id) {
      console.log('Navegando a los detalles del trabajo con ID:', job.id);
      this.router.navigate(['/job-detail', job.id]);
    } else {
      console.error('El trabajo no tiene un ID válido.');
    }
  }

  // Método para navegar al perfil del usuario
  goToProfile() {
    console.log('Navegando al perfil del usuario');
    this.router.navigate(['/profile']); // Cambia la ruta según tu configuración
  }

  // Método para navegar a la sección "Acerca de"
  goToAbout() {
    console.log('Navegando a la sección Acerca de');
    this.router.navigate(['/about']); // Cambia la ruta según tu configuración
  }

  // Método para cerrar sesión
  logout() {
    console.log('Cerrando sesión');
    this.authService.logout(); // Asegúrate de tener un método logout en AuthService
  }
}
